import { Injectable } from '@angular/core';
import { WordPlacementStrategyBase } from './WordPlacementStrategyBase';
import { WordPlacementStrategy } from './WordPlacementStrategy';
import { RandomNumberGeneratorService } from 'src/RandomNumberGenerator/RandomNumberGeneratorService';

@Injectable({
    providedIn: 'root'
})
export class DiagonalWordPlacementStrategy extends WordPlacementStrategyBase implements WordPlacementStrategy {
    constructor(
        private randomNumberGeneratorService: RandomNumberGeneratorService
    ) {
        super();
    }

    // a diagonally placed word spans both columns and rows
    public placeWord(currentState: string[][], word: string) {
        // TODO: allow diagonal words that read from bottom to top

        // there must be enough rows and columns to the bottom and right of the word to fit it
        let getStartRow = (rows) => this.randomNumberGeneratorService.generateRandomIntWithMax(rows - word.length);
        let getStartColumn = (columns) => this.randomNumberGeneratorService.generateRandomIntWithMax(columns - word.length);

        // hop over one column and row at a time
        let getNextRow = (row, i) => row + i;
        let getNextColumn = (column, i) => column + i;

        return super.placeWord(currentState, word, getStartRow, getStartColumn, getNextRow, getNextColumn);
    }
}