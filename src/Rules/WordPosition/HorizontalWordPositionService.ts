import { Injectable } from '@angular/core';
import { WordPositionModule } from './WordPositionModule';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { WordPosition } from './WordPosition';
import { WordPositionService } from './WordPositionService';
import { WordPositionServiceBase } from './WordPositionServiceBase';

@Injectable({
    providedIn: WordPositionModule
})
export class HorizontalWordPositionService extends WordPositionServiceBase {
    // always the same
    protected getNextRow(startRow: number) {
        return startRow;
    }

    // hop over one column at a time
    protected getNextColumn(startColumn: number, index: number) {
        return startColumn + index;
    }

    protected isOutOfBounds(currentState: WordSearchState, startPosition: WordPosition, word: string) {
        return startPosition.column + word.length > currentState.columns;
    }
}
