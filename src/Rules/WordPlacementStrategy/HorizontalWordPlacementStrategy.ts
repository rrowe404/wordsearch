import { RandomNumberGeneratorService } from 'src/Rules/RandomNumberGenerator/RandomNumberGeneratorService';
import { WordPlacementStrategyBase } from './WordPlacementStrategyBase';
import { Injectable } from '@angular/core';
import { WordPlacementStrategy } from './WordPlacementStrategy';
import { WordPlacementStrategyModule } from './WordPlacementStrategyModule';
import { WordSearchState } from '../WordSearchState/WordSearchState';

@Injectable({
    providedIn: WordPlacementStrategyModule
})
export class HorizontalWordPlacementStrategy extends WordPlacementStrategyBase implements WordPlacementStrategy {
    constructor(
        private randomNumberGeneratorService: RandomNumberGeneratorService
    ) {
        super();
    }

    // any row will do
    public getStartRow(currentState: WordSearchState, word: string) {
        return this.randomNumberGeneratorService.generateRandomIntWithMax(currentState.rows);
    }

    // a horizontally placed word spans columns and stays on the same row
    public placeWord(currentState: WordSearchState, word: string) {
        // allow enough room in the columns for the full word
        let getStartColumn = (columns) => this.randomNumberGeneratorService.generateRandomIntWithMax(columns - word.length);

        // always the same
        let getNextRow = (row) => row;

        // hop over one column at a time
        let getNextColumn = (column, i) => column + i;

        return super.placeWord(currentState, word, getStartColumn, getNextRow, getNextColumn);
    }
}