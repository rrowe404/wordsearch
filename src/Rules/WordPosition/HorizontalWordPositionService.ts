import { Injectable } from '@angular/core';
import { WordPositionModule } from './WordPositionModule';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { WordPosition } from './WordPosition';

@Injectable({
    providedIn: WordPositionModule
})
export class HorizontalWordPositionService {
    public getValidPositions(currentState: WordSearchState, word: string): WordPosition[] {
        return [];
    }

    // always the same
    public getNextRow(startRow: number) {
        return startRow;
    }

    // hop over one column at a time
    public getNextColumn(startColumn: number, index: number) {
        return startColumn + index;
    }
}
