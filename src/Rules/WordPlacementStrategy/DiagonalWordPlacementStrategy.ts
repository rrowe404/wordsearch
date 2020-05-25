import { Injectable } from '@angular/core';
import { WordPlacementStrategyBase } from './WordPlacementStrategyBase';
import { WordPlacementStrategy } from './WordPlacementStrategy';
import { RandomNumberGeneratorService } from 'src/Rules/RandomNumberGenerator/RandomNumberGeneratorService';
import { WordPlacementStrategyModule } from './WordPlacementStrategyModule';
import { WordSearchState } from '../WordSearchState/WordSearchState';

@Injectable({
    providedIn: WordPlacementStrategyModule
})
export class DiagonalWordPlacementStrategy extends WordPlacementStrategyBase implements WordPlacementStrategy {
    /** If true, place the word from bottom to top. Otherwise, place it from top to bottom. */
    private bottomsUp: boolean;

    constructor(
        private randomNumberGeneratorService: RandomNumberGeneratorService
    ) {
        super();
    }

    public getStartRow(currentState: WordSearchState, word: string) {
        if (this.bottomsUp) {
            // there must be enough rows and columns to the top of the word to fit it
            return this.randomNumberGeneratorService.generateRandomIntInRange(word.length, currentState.rows);
        }

        // there must be enough rows and columns to the bottom of the word to fit it
        return this.randomNumberGeneratorService.generateRandomIntWithMax(currentState.rows - word.length);
    }

    // there must be enough rows and columns to the right of the word to fit it
    public getStartColumn(currentState: WordSearchState, word: string) {
        return this.randomNumberGeneratorService.generateRandomIntWithMax(currentState.columns - word.length);
    }

    // hop over one row at a time
    public getNextRow(startRow: number, currentIndex: number) {
        return this.bottomsUp ? startRow - currentIndex : startRow + currentIndex;
    }

    // a diagonally placed word spans both columns and rows
    public placeWord(currentState: WordSearchState, word: string) {
        this.bottomsUp = this.randomNumberGeneratorService.flipACoin();

        return this.randomNumberGeneratorService.flipACoin() ?
               this.placeWordBottomUp(currentState, word) :
               this.placeWordTopDown(currentState, word);
    }

    private placeWordBottomUp(currentState: WordSearchState, word: string) {
        let getNextColumn = (column, i) => column + i;

        return super.placeWord(currentState, word, getNextColumn);
    }

    private placeWordTopDown(currentState: WordSearchState, word: string) {
        let getNextColumn = (column, i) => column + i;

        return super.placeWord(currentState, word, getNextColumn);
    }
}