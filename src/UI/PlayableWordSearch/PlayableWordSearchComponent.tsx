import * as React from 'react';
import * as _ from 'lodash';
import { ArrayGenerationService } from 'src/Rules/ArrayGeneration/ArrayGenerationService';
import { LetterWithPosition } from 'src/Rules/LetterWithPosition/LetterWithPosition';
import { WordBuilderService } from 'src/Rules/WordBuilder/WordBuilderService';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import './PlayableWordSearchComponent.less';
import { SizeTrackerComponent } from '../SizeTracker/SizeTrackerComponent';
import { SizeTrackerResize } from '../SizeTracker/SizeTrackerResize';
import { WordTracker } from 'src/Rules/WordTracker/WordTracker';
import { WinIndicator } from './WinIndicator/WinIndicator';
import { LetterTracker } from 'src/Rules/LetterTracker/LetterTracker';
import { WordList } from './WordList/WordList';
import { PlayableWordSearchContextProvider } from './PlayableWordSearchContextProvider';
import { Title } from './Title/Title';
import { PendingLetterTracker } from 'src/Rules/PendingLetterTracker/PendingLetterTracker';
import { Cell } from './Cell/Cell';
import { WordListContainer } from './WordList/WordListContainer';
import { GameWrapper } from './GameWrapper/GameWrapper';

interface PlayableWordSearchProps {
  state: WordSearchState;
}

interface PlayableWordSearchState {
  // these have to be arrays to use with map
  rows: number[];
  columns: number[];

  // used to track current selection
  startLetterTracker: PendingLetterTracker;
  endLetterTracker: PendingLetterTracker;

  // all lower for comparison purposes. must be updated with wordList.
  lowercaseWordList: string[];
  wordList: string[];

  // keeps track of what has been found
  wordTracker: WordTracker;

  // keeps track of letters of words that have been found
  letterTracker: LetterTracker;

  // the basis of calculation for resizing
  letterSize: number;
  tableWidth: number;
}

export class PlayableWordSearchComponent extends React.Component<
  {},
  PlayableWordSearchState
> {
  private arrayGenerationService = new ArrayGenerationService();
  private wordBuilderService = new WordBuilderService();

  constructor(public props: PlayableWordSearchProps) {
    super(props);

    let size = this.getSize();
    let wordListUpdate = this.getWordListUpdate();
    let letterSize = 0;
    let tableWidth = 0;

    this.state = {
      rows: size.rows,
      columns: size.columns,
      startLetterTracker: new PendingLetterTracker(),
      endLetterTracker: new PendingLetterTracker(),
      ...wordListUpdate,
      letterSize,
      tableWidth,
    };
  }

  render() {
    let winner = this.winner();

    // these are kinda magical, just numbers that feel good
    const MIN_LETTER_SIZE = 10;
    const MAX_LETTER_SIZE = 50;

    let cb = (size: SizeTrackerResize) => {
      let cols = this.props.state.columns;
      // gotta fit, so take the smaller of the two
      let basis = Math.floor(Math.min(size.width, size.height));
      let letterSize = Math.floor(basis / cols);

      // max size
      letterSize = Math.min(letterSize, MAX_LETTER_SIZE);

      // normalize
      letterSize = Math.max(letterSize, MIN_LETTER_SIZE);

      // in this case, the table doesn't need the whole space to render
      // so we need to recalculate the basis to make the width is correct
      if (letterSize === MAX_LETTER_SIZE) {
        basis = letterSize * cols;
      }

      if (letterSize !== this.state.letterSize) {
        this.setState({
          tableWidth: basis,
          letterSize,
        });
      }
    };

    return (
      <SizeTrackerComponent
        className='full-height'
        onResize={(size) => cb(size)}
      >
        <PlayableWordSearchContextProvider
          letterSize={this.state.letterSize}
          tableWidth={this.state.tableWidth}
          wordSearchState={this.props.state}
          wordTracker={this.state.wordTracker}
        >
          <div className='playable'>
            <Title />
            <GameWrapper>
              {this.state.rows.map((row) => {
                return (
                  <div className='row' key={row}>
                    {this.state.columns.map((column) => {
                      return (
                        <Cell
                          key={`${row}-${column}`}
                          onClick={() => this.markLetter(row, column)}
                          className={this.getTdClasses(row, column)}
                          style={this.getTdStyles()}
                          value={this.props.state.getValueAt(row, column)}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </GameWrapper>

            <WordListContainer>
              <WordList wordList={this.state.wordList} />
            </WordListContainer>

            {winner && <WinIndicator className='win' />}
          </div>
        </PlayableWordSearchContextProvider>
      </SizeTrackerComponent>
    );
  }

  private winner() {
    return this.state.wordTracker.isComplete();
  }

  private getSize() {
    return {
      rows: this.generateIndexArray(this.props.state.rows),
      columns: this.generateIndexArray(this.props.state.columns),
    };
  }

  private getTdClasses(row: number, column: number) {
    let result = ['cell'];

    if (this.isLetterCompleted(row, column)) {
      result.push('completed');
    }

    if (this.state.startLetterTracker.isPending({ row, column })) {
      result.push('pending');
    }

    return result.join(' ');
  }

  private getTdStyles() {
    return {
      width: this.state.letterSize,
      height: this.state.letterSize,
    };
  }

  private generateIndexArray(length: number) {
    return this.arrayGenerationService
      .generateEmptyArray(length)
      .map((value, i) => i);
  }

  private markLetter(row: number, column: number) {
    let letterWithPosition = {
      row,
      column,
      letter: this.props.state.getValueAt(row, column),
    };

    if (this.state.startLetterTracker.hasPending()) {
      this.state.endLetterTracker.setPending(letterWithPosition);
      this.connectWord();
    } else {
      this.state.startLetterTracker.setPending(letterWithPosition);
    }

    // Hack to rerender, TODO
    this.setState((previousState) => ({ ...previousState }));
  }

  private connectWord() {
    if (
      !this.state.startLetterTracker.hasPending() ||
      !this.state.endLetterTracker.hasPending()
    ) {
      return;
    }

    let wordBuilderResult = this.wordBuilderService.build(
      this.props.state,
      this.state.startLetterTracker.getPending(),
      this.state.endLetterTracker.getPending()
    );

    if (wordBuilderResult && this.isInWordList(wordBuilderResult.word)) {
      let accuratelyCasedWord = this.getAccuratelyCasedWord(
        wordBuilderResult.word
      );
      this.state.wordTracker.completeWord(accuratelyCasedWord);
      this.state.letterTracker.completeLetters(
        ...wordBuilderResult.lettersWithPositions
      );
    }

    this.state.startLetterTracker.clear();
    this.state.endLetterTracker.clear();
  }

  private getAccuratelyCasedWord(offcasedWord: string) {
    let index = this.state.wordList.findIndex(
      (word) => word.toLowerCase() === offcasedWord.toLowerCase()
    );

    if (index > -1) {
      return this.state.wordList[index];
    }

    return '';
  }

  private isInWordList(word: string) {
    return this.state.lowercaseWordList.indexOf(word.toLowerCase()) > -1;
  }

  private isLetterCompleted(row: number, column: number) {
    let letterWithPosition: LetterWithPosition = { letter: '', row, column };
    return this.state.letterTracker.isLetterComplete(letterWithPosition);
  }

  private getWordListUpdate() {
    let wordList = this.props.state.wordList;
    let wordTracker = new WordTracker(wordList);
    let letterTracker = new LetterTracker();

    return {
      wordList,
      lowercaseWordList: wordList.map((word) => word.toLowerCase()),
      wordTracker,
      letterTracker,
    };
  }
}
