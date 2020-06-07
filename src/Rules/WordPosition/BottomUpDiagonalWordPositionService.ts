import { Injectable } from '@angular/core';
import { WordPositionModule } from './WordPositionModule';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { WordPosition } from './WordPosition';
import { WordPositionService } from './WordPositionService';
import { start } from 'repl';

@Injectable({
    providedIn: WordPositionModule
})
export class BottomUpDiagonalWordPositionService {
    public bottomsUp: boolean;

    constructor(
        private wordPositionService: WordPositionService
    ) {
    }

    public getValidPositions(currentState: WordSearchState, word: string): WordPosition[] {
        let getNextPostion = (start: WordPosition, index: number) => {
            return this.getNextPosition(start, index);
        };

        let isOutOfBounds = (start) => {
            return this.isOutOfBounds(currentState, start, word);
        };

        return this.wordPositionService.getValidPositions(currentState, getNextPostion, isOutOfBounds, word);
    }

    public getNextPosition(startPosition: WordPosition, index: number) {
        return {
            row: this.getNextRow(startPosition.row, index),
            column: this.getNextColumn(startPosition.column, index)
        };
    }

    // hop over one row at a time
    private getNextRow(startRow: number, currentIndex: number) {
        return startRow - currentIndex;
    }

    private getNextColumn(startColumn: number, currentIndex: number) {
        return startColumn + currentIndex;
    }

    private isOutOfBounds(currentState: WordSearchState, startPosition: WordPosition, word: string) {
        return startPosition.row - word.length < -1 ||
               startPosition.column + word.length > currentState.columns;
    }
}
