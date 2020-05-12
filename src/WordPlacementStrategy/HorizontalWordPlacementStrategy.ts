import { RandomNumberGeneratorService } from 'src/RandomNumberGenerator/RandomNumberGeneratorService';
import { WordPlacementStrategyBase } from './WordPlacementStrategyBase';
import { Injectable } from '@angular/core';
import { WordPlacementStrategy } from './WordPlacementStrategy';

@Injectable({
    providedIn: 'root'
})
export class HorizontalWordPlacementStrategy extends WordPlacementStrategyBase implements WordPlacementStrategy {
    constructor(
        private randomNumberGeneratorService: RandomNumberGeneratorService
    ) {
        super();
    }

    // a horizontally placed word spans columns and stays on the same row
    public placeWord(currentState: string[][], word: string) {
        // any row will do
        let getStartRow = (rows) => this.randomNumberGeneratorService.generateRandomIntWithMax(rows);
        
        // allow enough room in the columns for the full word
        let getStartColumn = (columns) => this.randomNumberGeneratorService.generateRandomIntWithMax(columns - word.length);

        // always the same
        let getNextRow = (row) => row;

        // hop over one column at a time
        let getNextColumn = (column, i) => column + i;

        return super.placeWord(currentState, word, getStartRow, getStartColumn, getNextRow, getNextColumn);
    }
}