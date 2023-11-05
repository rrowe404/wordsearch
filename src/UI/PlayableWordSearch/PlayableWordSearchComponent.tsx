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

interface PlayableWordSearchProps {
  state: WordSearchState;
}

interface PlayableWordSearchState {
  // these have to be arrays to use with map
  rows: number[];
  columns: number[];

  // used to track current selection
  startLetter: LetterWithPosition;
  endLetter: LetterWithPosition;

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
      startLetter: null,
      endLetter: null,
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
          wordSearchState={this.props.state}
          wordTracker={this.state.wordTracker}
        >
          <div className='playable'>
            <Title />
            <div className='game' style={{ width: this.getTableWidth() }}>
              {this.state.rows.map((row) => {
                return (
                  <div className='row' key={row}>
                    {this.state.columns.map((column) => {
                      return (
                        <div
                          key={`${row}-${column}`}
                          onClick={() => this.markLetter(row, column)}
                          className={this.getTdClasses(row, column)}
                          style={this.getTdStyles()}
                        >
                          {this.props.state.getValueAt(row, column)}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {this.props.state.showWordList ? (
              <div
                className='wordListContainer'
                style={{ maxWidth: this.getTableWidth() }}
              >
                <WordList wordList={this.state.wordList} />
              </div>
            ) : null}

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

    if (this.isLetterPending(row, column)) {
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

  private getTableWidth() {
    return this.state.tableWidth;
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

    if (this.state.startLetter) {
      this.setState({ endLetter: letterWithPosition }, () =>
        this.connectWord()
      );
    } else {
      this.setState({ startLetter: letterWithPosition });
    }
  }

  private connectWord() {
    if (!this.state.startLetter || !this.state.endLetter) {
      return;
    }

    let wordBuilderResult = this.wordBuilderService.build(
      this.props.state,
      this.state.startLetter,
      this.state.endLetter
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

    this.setState({
      startLetter: null,
      endLetter: null,
    });
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

  public isLetterPending(row, column) {
    return (
      this.state.startLetter &&
      this.state.startLetter.row === row &&
      this.state.startLetter.column === column
    );
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
