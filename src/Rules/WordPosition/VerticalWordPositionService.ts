import { Injectable } from '@angular/core';
import { WordPositionModule } from './WordPositionModule';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { WordPosition } from './WordPosition';
import { WordPositionServiceBase } from './WordPositionServiceBase';

@Injectable({
    providedIn: WordPositionModule
})
export class VerticalWordPositionService extends WordPositionServiceBase {
    // hop over one row at a time
    protected getNextRow(startRow: number, currentIndex: number) {
        return startRow + currentIndex;
    }

    // always the same
    protected getNextColumn(startRow: number) {
        return startRow;
    }

    protected isOutOfBounds(currentState: WordSearchState, startPosition: WordPosition, word: string) {
        return startPosition.row + word.length > currentState.rows;
    }
}
