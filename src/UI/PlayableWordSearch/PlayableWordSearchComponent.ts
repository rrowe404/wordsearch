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
        <table>
            <tr *ngFor="let row of rows">
                <td *ngFor="let column of columns;" (click)="markLetter(row, column)">
                    {{ state.getValueAt(row, column) }}
                </td>
            </tr>
        </table>

        <div *ngFor="let word of wordList">
            {{ word }}
        </div>
    `
})
export class PlayableWordSearchComponent implements OnInit, OnChanges {
    @Input() public state: WordSearchState;

    constructor(
        private arrayGenerationService: ArrayGenerationService,
        private wordBuilderService: WordBuilderService,
    )  {
    }

    // these have to be arrays to use with ngFor
    public rows: number[];
    public columns: number[];

    public wordList: string[];

    // all lower for comparison purposes. must be updated with wordList.
    public lowercaseWordList: string[];

    // used to track current selection
    private startLetter: LetterWithPosition;
    private endLetter: LetterWithPosition;

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

            if (this.isInWordList(wordBuilderResult.word)) {
                console.log('bingo!');
            }

            this.startLetter = null;
            this.endLetter = null;
        }
    }

    public ngOnInit() {
        this.rows = this.generateIndexArray(this.state.rows);
        this.columns = this.generateIndexArray(this.state.columns);
        this.setWordList();
    }

    public ngOnChanges() {
        this.setWordList();
    }

    private generateIndexArray(length: number) {
        return this.arrayGenerationService.generateEmptyArray(length).map((value, i) => i);
    }

    /**
     * the getter for state.wordList performs operations,
     * so it should only be updated when necessary
     */
    private setWordList() {
        this.wordList = this.state.wordList;
        this.lowercaseWordList = this.wordList.map(word => word.toLowerCase());
    }

    private isInWordList(word: string) {
        return this.lowercaseWordList.indexOf(word.toLowerCase()) > -1;
    }
}
