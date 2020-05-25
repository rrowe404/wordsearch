import { Injectable } from '@angular/core';
import { WordPlacementStrategy } from './WordPlacementStrategy';
import { RandomNumberGeneratorService } from 'src/Rules/RandomNumberGenerator/RandomNumberGeneratorService';
import { WordPlacementStrategyBase } from './WordPlacementStrategyBase';
import { WordPlacementStrategyModule } from './WordPlacementStrategyModule';
import { WordSearchState } from '../WordSearchState/WordSearchState';

@Injectable({
    providedIn: WordPlacementStrategyModule
})
export class VerticalWordPlacementStrategy extends WordPlacementStrategyBase implements WordPlacementStrategy {
    constructor(
        private randomNumberGeneratorService: RandomNumberGeneratorService
    ) {
        super();
    }

    // allow enough room in the rows for the full word
    public getStartRow(currentState: WordSearchState, word: string) {
        return this.randomNumberGeneratorService.generateRandomIntWithMax(currentState.rows - word.length);
    }

    // any column will do
    public getStartColumn(currentState: WordSearchState, word: string) {
        return this.randomNumberGeneratorService.generateRandomIntWithMax(currentState.columns);
    }

    // hop over one row at a time
    public getNextRow(startRow: number, currentIndex: number) {
        return startRow + currentIndex;
    }

    // a vertically placed word spans rows and stays in the same column
    public placeWord(currentState: WordSearchState, word: string) {
        // always the same
        let getNextColumn = (column) => column;

        return super.placeWord(currentState, word, getNextColumn)
    }
}