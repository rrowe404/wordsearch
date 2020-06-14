import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { ArrayGenerationService } from 'src/Rules/ArrayGeneration/ArrayGenerationService';

@Component({
    selector: 'wordsearch-playable',
    styleUrls: ['./PlayableWordSearchComponent.less'],
    template: `
        <div class="title">{{ state.title }}</div>
        <table>
            <tr *ngFor="let row of rows">
                <td *ngFor="let column of columns">
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

    constructor(private arrayGenerationService: ArrayGenerationService)  {
    }

    // these have to be arrays to use with ngFor
    public rows: number[];
    public columns: number[];

    public wordList: string[];

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
    }
}
