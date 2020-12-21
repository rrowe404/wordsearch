import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { ArrayGenerationService } from 'src/Rules/ArrayGeneration/ArrayGenerationService';
import { LetterWithPosition } from 'src/Rules/LetterWithPosition/LetterWithPosition';
import { WordBuilderService } from '../../Rules/WordBuilder/WordBuilderService';

@Component({
    selector: 'wordsearch-playable',
    styleUrls: ['./PlayableWordSearchComponent.less'],
    template: `
        <div class="title">{{ state.title }}</div>
        <table [style.width]="getTableWidth()">
            <tr *ngFor="let row of rows">
                <td *ngFor="let column of columns;" (click)="markLetter(row, column)" [class.completed]="isLetterCompleted(row, column)" [class.pending]="isLetterPending(row, column)">
                    {{ state.getValueAt(row, column) }}
                </td>
            </tr>
        </table>

        <div class="wordListContainer" [style.maxWidth]="getTableWidth()">
            <div *ngFor="let word of wordList" class="wordListWord" [class.completed]="wordMap[word]">
                {{ word }}
            </div>
        </div>

        <div class="win" *ngIf="winner()">
            WINNER
        </div>
    `
})
export class PlayableWordSearchComponent implements OnInit, OnChanges {
    @Input() public state: WordSearchState;

    private arrayGenerationService = new ArrayGenerationService();

    constructor(
        private wordBuilderService: WordBuilderService,
    )  {
    }

    // these have to be arrays to use with ngFor
    public rows: number[];
    public columns: number[];

    public wordList: string[];

    // keeps track of what has been found
    public wordMap: { [key: string]: boolean };

    // keeps track of letters of words that have been found
    public letterMap: { [key: string]: boolean };

    // all lower for comparison purposes. must be updated with wordList.
    public lowercaseWordList: string[];

    // used to track current selection
    private startLetter: LetterWithPosition;
    private endLetter: LetterWithPosition;

    public getTableWidth() {
        return this.state.columns * 20 + 'px';
    }

    public markLetter(row, column) {
        let letterWithPosition = { row, column, letter: this.state.getValueAt(row, column) };

        if (this.startLetter) {
            this.endLetter = letterWithPosition;
        } else {
            this.startLetter = letterWithPosition;
        }

        if (this.startLetter && this.endLetter) {
            let wordBuilderResult = this.wordBuilderService.build(this.state, this.startLetter, this.endLetter);
            console.log(wordBuilderResult);

            if (wordBuilderResult && this.isInWordList(wordBuilderResult.word)) {
                let accuratelyCasedWord = this.getAccuratelyCasedWord(wordBuilderResult.word);
                this.wordMap[accuratelyCasedWord] = true;

                wordBuilderResult.lettersWithPositions.forEach(lwp => {
                    this.letterMap[this.computeLetterMapKey(lwp)] = true;
                });
            }

            this.startLetter = null;
            this.endLetter = null;
        }
    }

    public isLetterCompleted(row, column) {
        let letterWithPosition: LetterWithPosition = { letter: '', row, column };
        return this.letterMap[this.computeLetterMapKey(letterWithPosition)];
    }

    public isLetterPending(row, column) {
        return this.startLetter && this.startLetter.row === row && this.startLetter.column === column;
    }

    public ngOnInit() {
        this.intialize();
    }

    public ngOnChanges() {
        this.intialize();
    }

    public winner() {
        return Object.keys(this.wordMap).every(key => this.wordMap[key]);
    }

    private generateIndexArray(length: number) {
        return this.arrayGenerationService.generateEmptyArray(length).map((value, i) => i);
    }

    private intialize() {
        this.setSize();
        this.setWordList();
    }

    /**
     * the getter for state.wordList performs operations,
     * so it should only be updated when necessary
     */
    private setWordList() {
        // TODO this causes issues when 'show word list' is off
        this.wordList = this.state.wordList;
        this.lowercaseWordList = this.wordList.map(word => word.toLowerCase());

        this.wordMap = {};
        this.wordList.forEach((word) => this.wordMap[word] = false);

        this.letterMap = {};
    }

    private setSize() {
        this.rows = this.generateIndexArray(this.state.rows);
        this.columns = this.generateIndexArray(this.state.columns);
    }

    private isInWordList(word: string) {
        return this.lowercaseWordList.indexOf(word.toLowerCase()) > -1;
    }

    private getAccuratelyCasedWord(offcasedWord: string) {
        let index = this.wordList.findIndex(word => word.toLowerCase() === offcasedWord.toLowerCase());

        if (index > -1) {
            return this.wordList[index];
        }

        return '';
    }

    private computeLetterMapKey(letterWithPosition: LetterWithPosition) {
        return `${letterWithPosition.row}-${letterWithPosition.column}`;
    }
}
