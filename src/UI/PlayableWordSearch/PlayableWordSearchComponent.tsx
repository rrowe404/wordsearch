import * as React from 'react';
import * as _ from 'lodash';
import { ArrayGenerationService } from 'src/Rules/ArrayGeneration/ArrayGenerationService';
import { LetterWithPosition } from 'src/Rules/LetterWithPosition/LetterWithPosition';
import { WordBuilderService } from 'src/Rules/WordBuilder/WordBuilderService';
import { WordSearchState } from "src/Rules/WordSearchState/WordSearchState";

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
}

export class PlayableWordSearchComponent extends React.Component<{}, PlayableWordSearchState> {
    private arrayGenerationService = new ArrayGenerationService();
    private wordBuilderService = new WordBuilderService();

    constructor(public props: PlayableWordSearchProps) {
        super(props);

        let size = this.getSize();
        let wordListUpdate = this.getWordListUpdate();

        this.state = {
            rows: size.rows,
            columns: size.columns,
            startLetter: null,
            endLetter: null,
            lowercaseWordList: wordListUpdate.lowercaseWordList,
            wordList: wordListUpdate.wordList,
            wordMap: wordListUpdate.wordMap,
            letterMap: wordListUpdate.letterMap
        }
    }

    render() {
        let winner = this.winner();

        return (
            <div className='playable'>
                <div className='title'>{this.props.state.title}</div>
                <table style={{ width: this.getTableWidth() }}>
                    <tbody>
                        {this.state.rows.map(row => {
                            return (
                                <tr key={row}>
                                    {this.state.columns.map(column => {
                                        return (
                                            <td key={`${row}-${column}`} onClick={() => this.markLetter(row, column)} className={this.getTdClasses(row, column)}>
                                                {this.props.state.getValueAt(row, column)}
                                            </td>
                                        );
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <div className='wordListContainer' style={{ maxWidth: this.getTableWidth() }}>
                    {this.state.wordList.map(word => {
                        return (
                            <div className={this.getWordListWordClasses(word)}>
                                {word}
                            </div>
                        )
                    })}
                </div>

                {winner ? <div className='win'>WINNER</div> : null}
            </div>
        )
    }

    private getWordListWordClasses(word: string) {
        let result = ['wordListWord']

        if (this.state.wordMap[word]) {
            result.push('completed');
        };

        return result.join(' ');
    }

    private winner() {
        return Object.keys(this.state.wordMap).every(key => this.state.wordMap[key]);
    }

    private reinitialize() {
        this.setSize();
        this.setWordList();
    }

    private setSize() {
        let size = this.getSize();

        this.setState({
            rows: size.rows,
            columns: size.columns
        })
    }

    private getSize() {
        return {
            rows: this.generateIndexArray(this.props.state.rows),
            columns: this.generateIndexArray(this.props.state.columns)
        }
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

    private getTableWidth() {
        return this.props.state.columns * 20 + 'px';
    }

    private generateIndexArray(length: number) {
        return this.arrayGenerationService.generateEmptyArray(length).map((value, i) => i);
    }

    private markLetter(row: number, column: number) {
        let letterWithPosition = { row, column, letter: this.props.state.getValueAt(row, column) };

        if (this.state.startLetter) {
            this.setState({ endLetter: letterWithPosition });
        } else {
            this.setState({ startLetter: letterWithPosition });
        }

        if (this.state.startLetter && this.state.endLetter) {
            let wordBuilderResult = this.wordBuilderService.build(this.props.state, this.state.startLetter, this.state.endLetter);
            console.log(wordBuilderResult);

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
        return this.state.letterMap[this.computeLetterMapKey(letterWithPosition)]
    }

    public isLetterPending(row, column) {
        return this.state.startLetter && this.state.startLetter.row === row && this.state.startLetter.column === column;
    }

    private computeLetterMapKey(letterWithPosition: LetterWithPosition) {
        return `${letterWithPosition.row}-${letterWithPosition.column}`;
    }

    /**
    * the getter for state.wordList performs operations,
    * so it should only be updated when necessary
    */
    private setWordList() {
        this.setState(this.getWordListUpdate());
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