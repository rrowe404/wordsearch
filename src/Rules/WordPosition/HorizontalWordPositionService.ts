import { Injectable } from '@angular/core';
import { WordPositionModule } from './WordPositionModule';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { WordPosition } from './WordPosition';
import { WordPositionService } from './WordPositionService';

@Injectable({
    providedIn: WordPositionModule
})
export class HorizontalWordPositionService {
    constructor(
        private wordPositionService: WordPositionService
    ) {
    }

    public getValidPositions(currentState: WordSearchState, word: string): WordPosition[] {
        return this.wordPositionService.getValidPositions(currentState, this.getNextPosition.bind(this), word);
    }

    public getNextPosition(startPosition: WordPosition, index: number) {
        return {
            row: this.getNextRow(startPosition.row),
            column: this.getNextColumn(startPosition.column, index)
        };
    }

    // always the same
    private getNextRow(startRow: number) {
        return startRow;
    }

    // hop over one column at a time
    private getNextColumn(startColumn: number, index: number) {
        return startColumn + index;
    }
}
