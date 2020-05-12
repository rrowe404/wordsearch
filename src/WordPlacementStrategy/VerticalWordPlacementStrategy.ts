import { Injectable } from '@angular/core';
import { WordPlacementStrategy } from './WordPlacementStrategy';
import { RandomNumberGeneratorService } from 'src/RandomNumberGenerator/RandomNumberGeneratorService';
import { WordPlacementStrategyBase } from './WordPlacementStrategyBase';

@Injectable({
    providedIn: 'root'
})
export class VerticalWordPlacementStrategy extends WordPlacementStrategyBase implements WordPlacementStrategy {
    constructor(
        private randomNumberGeneratorService: RandomNumberGeneratorService
    ) {
        super();
    }

    // a vertically placed word spans rows and stays in the same column
    public placeWord(currentState: string[][], word: string) {
        // allow enough room in the rows for the full word
        let getStartRow = (rows) => this.randomNumberGeneratorService.generateRandomIntWithMax(rows - word.length);
 
        // any column will do
        let getStartColumn = (columns) => this.randomNumberGeneratorService.generateRandomIntWithMax(columns - word.length);
        
        // hop over one row at a time
        let getNextRow = (row, i) => row + i;

        // always the same
        let getNextColumn = (column) => column;

        return super.placeWord(currentState, word, getStartRow, getStartColumn, getNextRow, getNextColumn)
    }
}