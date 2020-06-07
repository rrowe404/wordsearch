import { Injectable } from '@angular/core';
import { WordPositionModule } from './WordPositionModule';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { WordPosition } from './WordPosition';
import { WordPositionService } from './WordPositionService';

@Injectable({
    providedIn: WordPositionModule
})
export class VerticalWordPositionService {
    constructor(
        private wordPositionService: WordPositionService
    ) {
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

    public getNextPosition(startPosition: WordPosition, index: number) {
        return {
            row: this.getNextRow(startPosition.row, index),
            column: this.getNextColumn(startPosition.column)
        };
    }

    // hop over one row at a time
    private getNextRow(startRow: number, currentIndex: number) {
        return startRow + currentIndex;
    }

    // always the same
    private getNextColumn(startRow: number) {
        return startRow;
    }

    public isOutOfBounds(currentState: WordSearchState, startPosition: WordPosition, word: string) {
        return startPosition.row + word.length > currentState.rows;
    }
}
