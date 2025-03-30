import * as React from 'react';
import { WordBuilderService } from 'src/Rules/WordBuilder/WordBuilderService';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { SizeTrackerComponent } from '../SizeTracker/SizeTrackerComponent';
import { SizeTrackerResize } from '../SizeTracker/SizeTrackerResize';
import { Cell } from './Cell/Cell';
import { GameWrapper } from './GameWrapper/GameWrapper';
import { PlayableWordSearchContextProvider } from './PlayableWordSearchContextProvider';
import { getSize } from './PlayableWordSearchSizeHelper';
import { Title } from './Title/Title';
import { WinIndicator } from './WinIndicator/WinIndicator';
import { WordList } from './WordList/WordList';
import { WordListContainer } from './WordList/WordListContainer';
import './PlayableWordSearchComponent.less';
import { usePendingLetterTracker } from 'src/Rules/PendingLetterTracker/usePendingLetterTracker';
import { useLetterTracker } from 'src/Rules/LetterTracker/useLetterTracker';
import { useWordTracker } from 'src/Rules/WordTracker/useWordTracker';
import { Position } from 'src/Rules/Position/Position';

// these are kinda magical, just numbers that feel good
const MIN_LETTER_SIZE = 10;
const MAX_LETTER_SIZE = 50;

const wordBuilderService = new WordBuilderService();

interface Props {
  wordSearchState: WordSearchState;
}

const PlayableWordSearch: React.FC<Props> = ({ wordSearchState }) => {
  const [letterSize, setLetterSize] = React.useState(0);
  const [tableWidth, setTableWidth] = React.useState(0);
  const titleRef = React.useRef<HTMLDivElement>(null);
  const wordListRef = React.useRef<HTMLDivElement>(null);
  const size = getSize(wordSearchState);
  const { columns, wordList } = wordSearchState;
  const wordTracker = useWordTracker(wordList);
  const letterTracker = useLetterTracker();
  const startLetterTracker = usePendingLetterTracker();
  const endLetterTracker = usePendingLetterTracker();

  const connectWord = () => {
    if (!startLetterTracker.hasPending() || !endLetterTracker.hasPending()) {
      return;
    }

    const wordBuilderResult = wordBuilderService.build(
      wordSearchState,
      startLetterTracker.pending,
      endLetterTracker.pending
    );

    const accuratelyCasedWord = getAccuratelyCasedWord(wordBuilderResult?.word);

    if (accuratelyCasedWord) {
      wordTracker.completeWord(accuratelyCasedWord);
      letterTracker.completeLetters(...wordBuilderResult.lettersWithPositions);
    }

    startLetterTracker.clear();
    endLetterTracker.clear();
  };

  React.useEffect(() => {
    connectWord();
  }, [startLetterTracker.pending, endLetterTracker.pending]);

  const onResize = React.useCallback(
    (resize: SizeTrackerResize) => {
      // gotta fit, so take the smaller of the two
      let basis = Math.floor(Math.min(resize.width, resize.height));

      // if the height is what is restricting us, we need to account for title/wordlist height too
      if (basis === Math.floor(resize.height)) {
        const titleHeight = titleRef?.current?.clientHeight ?? 0;
        const wordListHeight = wordListRef?.current?.clientHeight ?? 0;

        basis -= titleHeight + wordListHeight;
      }

      let newLetterSize = Math.floor(basis / columns);

      // max size
      newLetterSize = Math.min(newLetterSize, MAX_LETTER_SIZE);

      // normalize
      newLetterSize = Math.max(newLetterSize, MIN_LETTER_SIZE);

      // in this case, the table doesn't need the whole space to render
      // so we need to recalculate the basis to make the width is correct
      if (newLetterSize === MAX_LETTER_SIZE) {
        basis = newLetterSize * columns;
      }

      if (newLetterSize !== letterSize) {
        setTableWidth(basis);
        setLetterSize(newLetterSize);
      }
    },
    [columns]
  );

  const getAccuratelyCasedWord = (offcasedWord: string) => {
    if (!offcasedWord) {
      return null;
    }

    const index = wordList.findIndex(
      (word) => word.toLowerCase() === offcasedWord.toLowerCase()
    );

    if (index > -1) {
      return wordList[index];
    }

    return '';
  };

  const markLetter = (position: Position) => {
    if (startLetterTracker.hasPending()) {
      endLetterTracker.setPending(position);
    } else {
      startLetterTracker.setPending(position);
    }
  };

  const winner = wordTracker.isComplete();

  return (
    <SizeTrackerComponent
      className='full-height full-width'
      onResize={(resize) => onResize(resize)}
    >
      <PlayableWordSearchContextProvider
        letterSize={letterSize}
        letterTracker={letterTracker}
        startLetterTracker={startLetterTracker}
        tableWidth={tableWidth}
        wordSearchState={wordSearchState}
        wordTracker={wordTracker}
      >
        <div className='playable'>
          <Title ref={titleRef} />
          <GameWrapper>
            {size.rows.map((row) => {
              return (
                <div className='row' key={row}>
                  {size.columns.map((column) => {
                    const position = { row, column };

                    return (
                      <Cell
                        key={`${row}-${column}`}
                        onClick={() => markLetter(position)}
                        position={position}
                      />
                    );
                  })}
                </div>
              );
            })}
          </GameWrapper>

          <WordListContainer ref={wordListRef}>
            <WordList />
          </WordListContainer>
          {winner && <WinIndicator className='win' />}
        </div>
      </PlayableWordSearchContextProvider>
    </SizeTrackerComponent>
  );
};

export { PlayableWordSearch as PlayableWordSearchComponent };
