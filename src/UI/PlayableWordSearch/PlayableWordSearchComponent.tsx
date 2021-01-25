import * as React from 'react';
import * as _ from 'lodash';
import { ArrayGenerationService } from 'src/Rules/ArrayGeneration/ArrayGenerationService';
import { LetterWithPosition } from 'src/Rules/LetterWithPosition/LetterWithPosition';
import { WordBuilderService } from 'src/Rules/WordBuilder/WordBuilderService';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import './PlayableWordSearchComponent.less';
import { SizeTrackerComponent } from '../SizeTracker/SizeTrackerComponent';
import { SizeTrackerResize } from '../SizeTracker/SizeTrackerResize';

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
    wordMap: { [key: string]: boolean };

    // keeps track of letters of words that have been found
    letterMap: { [key: string]: boolean };

    // the basis of calculation for resizing
    letterSize: number;
    tableWidth: number;
}

export class PlayableWordSearchComponent extends React.Component<{}, PlayableWordSearchState> {
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
            lowercaseWordList: wordListUpdate.lowercaseWordList,
            wordList: wordListUpdate.wordList,
            wordMap: wordListUpdate.wordMap,
            letterMap: wordListUpdate.letterMap,
            letterSize,
            tableWidth
        };
    }

    render() {
        let winner = this.winner();

        const MAX_LETTER_SIZE = 50;

        let cb = (size: SizeTrackerResize) => {
            let cols = this.props.state.columns;
            // gotta fit, so take the smaller of the two
            let basis = Math.floor(Math.min(size.width, size.height));
            let letterSize = Math.floor(basis / cols);

            // max size
            letterSize = Math.min(letterSize, MAX_LETTER_SIZE);

            // in this case, the table doesn't need the whole space to render
            // so we need to recalculate the basis to make the width is correct
            if (letterSize === MAX_LETTER_SIZE) {
                basis = letterSize * cols;
            }

            if (letterSize !== this.state.letterSize) {
                this.setState({
                    tableWidth: basis,
                    letterSize
                });
            }
        };

        return (
            <SizeTrackerComponent className='full-height' onResize={(size) => cb(size)}>
                <div className='playable'>
                    <div className='title'>{this.props.state.title}</div>
                    <table style={{ width: this.getTableWidth() }}>
                        <tbody>
                            {this.state.rows.map(row => {
                                return (
                                    <tr key={row}>
                                        {this.state.columns.map(column => {
                                            return (
                                                <td key={`${row}-${column}`} onClick={() => this.markLetter(row, column)}
                                                    className={this.getTdClasses(row, column)} style={this.getTdStyles()}>
                                                    {this.props.state.getValueAt(row, column)}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {this.props.state.showWordList ?
                        <div className='wordListContainer' style={{ maxWidth: this.getTableWidth() }}>
                            {this.state.wordList.map(word => {
                                return (
                                    <div className={this.getWordListWordClasses(word)}>
                                        {word}
                                    </div>
                                );
                            })}
                        </div> : null}

                    {winner ? <div className='win'>WINNER</div> : null}
                </div>
            </SizeTrackerComponent>
        );
    }

    private getWordListWordClasses(word: string) {
        let result = ['wordListWord'];

        if (this.state.wordMap[word]) {
            result.push('completed');
        }

        return result.join(' ');
    }

    private winner() {
        return Object.keys(this.state.wordMap).every(key => this.state.wordMap[key]);
    }

    private getSize() {
        return {
            rows: this.generateIndexArray(this.props.state.rows),
            columns: this.generateIndexArray(this.props.state.columns)
        };
    }

    private getTdClasses(row: number, column: number) {
        let result = [];

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
            height: this.state.letterSize
        };
    }

    private getTableWidth() {
        return this.state.tableWidth;
    }

    private generateIndexArray(length: number) {
        return this.arrayGenerationService.generateEmptyArray(length).map((value, i) => i);
    }

    private markLetter(row: number, column: number) {
        let letterWithPosition = { row, column, letter: this.props.state.getValueAt(row, column) };

        if (this.state.startLetter) {
            this.setState({ endLetter: letterWithPosition }, () => this.connectWord());
        } else {
            this.setState({ startLetter: letterWithPosition });
        }
    }

    private connectWord() {
        if (!this.state.startLetter || !this.state.endLetter) {
            return;
        }

        let wordBuilderResult = this.wordBuilderService.build(this.props.state, this.state.startLetter, this.state.endLetter);

        if (wordBuilderResult && this.isInWordList(wordBuilderResult.word)) {
            let accuratelyCasedWord = this.getAccuratelyCasedWord(wordBuilderResult.word);
            let wordMap = _.cloneDeep(this.state.wordMap);
            wordMap[accuratelyCasedWord] = true;
            this.setState({ wordMap });

            let letterMap = _.cloneDeep(this.state.letterMap);

            wordBuilderResult.lettersWithPositions.forEach(lwp => {
                letterMap[this.computeLetterMapKey(lwp)] = true;
            });

            this.setState({ letterMap });
        }

        this.setState({
            startLetter: null,
            endLetter: null
        });
    }

    private getAccuratelyCasedWord(offcasedWord: string) {
        let index = this.state.wordList.findIndex(word => word.toLowerCase() === offcasedWord.toLowerCase());

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
        return this.state.letterMap[this.computeLetterMapKey(letterWithPosition)];
    }

    public isLetterPending(row, column) {
        return this.state.startLetter && this.state.startLetter.row === row && this.state.startLetter.column === column;
    }

    private computeLetterMapKey(letterWithPosition: LetterWithPosition) {
        return `${letterWithPosition.row}-${letterWithPosition.column}`;
    }

    private getWordListUpdate() {
        let wordList = this.props.state.wordList;
        let wordMap = {};
        wordList.forEach(word => wordMap[word] = false);
        let letterMap = {};

        return ({
            wordList,
            lowercaseWordList: wordList.map(word => word.toLowerCase()),
            wordMap,
            letterMap
        });
    }
}
