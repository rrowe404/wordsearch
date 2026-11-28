import * as React from 'react';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { SizeTrackerComponent } from '../SizeTracker/SizeTrackerComponent';
import { GameWrapper } from './GameWrapper/GameWrapper';
import { PlayableWordSearchContextProvider } from './PlayableWordSearchContextProvider';
import { Title } from './Title/Title';
import { WinIndicator } from './WinIndicator/WinIndicator';
import { WordList } from './WordList/WordList';
import { WordListContainer } from './WordList/WordListContainer';
import { WordSearchGrid } from './WordSearchGrid/WordSearchGrid';
import './PlayableWordSearchComponent.less';
import { useWordSelection } from './useWordSelection';
import { useWordCompletion } from './useWordCompletion';
import { usePlayableWordSearchSize } from './usePlayableWordSearchSize';
import { getSize } from './PlayableWordSearchSizeHelper';

interface Props {
  wordSearchState: WordSearchState;
}

const PlayableWordSearch: React.FC<Props> = ({ wordSearchState }) => {
  const titleRef = React.useRef<HTMLDivElement>(null);
  const wordListRef = React.useRef<HTMLDivElement>(null);
  const size = getSize(wordSearchState);
  const { columns } = wordSearchState;
  const { letterSize, tableWidth, onResize } =
    usePlayableWordSearchSize({ columns, titleRef, wordListRef });
  const {
    winner,
    letterTracker,
    startLetterTracker,
    endLetterTracker,
    wordTracker,
  } = useWordCompletion(wordSearchState);
  const wordSelection = useWordSelection(
    startLetterTracker,
    endLetterTracker,
    { rowCount: size.rows.length, columnCount: size.columns.length }
  );

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
        <div className={`playable${wordSearchState.showGrid ? ' showGrid' : ''}`}>
          <Title ref={titleRef} />
          <GameWrapper
            onPointerCancel={(event) => wordSelection.cancelDrag(event.pointerId)}
            onPointerLeave={wordSelection.onGamePointerLeave}
            onPointerMove={wordSelection.onGamePointerMove}
          >
            <WordSearchGrid
              wordSelection={wordSelection}
              rows={size.rows}
              columns={size.columns}
            />
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
