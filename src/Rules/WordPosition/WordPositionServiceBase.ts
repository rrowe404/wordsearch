import { Injectable } from '@angular/core';
import { WordPositionModule } from './WordPositionModule';
import { WordPositionService } from './WordPositionService';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { WordPosition } from './WordPosition';
import { RandomNumberGeneratorService } from '../RandomNumberGenerator/RandomNumberGeneratorService';

/** Abstract base class for the directional services, to extract the common logic */
@Injectable({
    providedIn: WordPositionModule
})
export abstract class WordPositionServiceBase {
    protected abstract getNextRow(startRow: number, index: number);
    protected abstract getNextColumn(startColumn: number, index: number);
    protected abstract isOutOfBounds(currentState: WordSearchState, startPosition: WordPosition, word: string);

    constructor(
        private randomNumberGeneratorService: RandomNumberGeneratorService,
        private wordPositionService: WordPositionService
    ) {
    }

    public getStartPosition(currentState: WordSearchState, word: string) {
        let validPositions = this.getValidPositions(currentState, word);

        if (!validPositions.length) {
            return null;
        }

        return this.randomNumberGeneratorService.getRandomValueFrom(validPositions);
    }

    public getNextPosition(startPosition: WordPosition, index: number) {
        return {
            row: this.getNextRow(startPosition.row, index),
            column: this.getNextColumn(startPosition.column, index)
        };
    }

    public getValidPositions(currentState: WordSearchState, word: string): WordPosition[] {
        let getNextPosition = (start: WordPosition, index: number) => {
            return this.getNextPosition(start, index);
        };

        let isOutOfBounds = (start: WordPosition) => {
            return this.isOutOfBounds(currentState, start, word);
        };

        return this.wordPositionService.getValidPositions(currentState, getNextPosition, isOutOfBounds, word);
    }
}
