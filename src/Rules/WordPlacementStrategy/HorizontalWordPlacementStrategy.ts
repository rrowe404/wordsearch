import { WordPlacementStrategyBase } from './WordPlacementStrategyBase';
import { Injectable } from '@angular/core';
import { WordPlacementStrategy } from './WordPlacementStrategy';
import { WordPlacementStrategyModule } from './WordPlacementStrategyModule';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { WordPosition } from '../WordPosition/WordPosition';

@Injectable({
    providedIn: WordPlacementStrategyModule
})
export class HorizontalWordPlacementStrategy extends WordPlacementStrategyBase implements WordPlacementStrategy {
    // any row will do
    private getStartRow(currentState: WordSearchState, word: string) {
        return this.randomNumberGeneratorService.generateRandomIntWithMax(currentState.rows);
    }

    // allow enough room in the columns for the full word
    private getStartColumn(currentState: WordSearchState, word: string) {
        return this.randomNumberGeneratorService.generateRandomIntWithMax(currentState.columns - word.length);
    }

    public getStartPosition(currentState: WordSearchState, word: string) {
        return { column: this.getStartColumn(currentState, word), row: this.getStartRow(currentState, word) };
    }

    // always the same
    private getNextRow(startRow: number) {
        return startRow;
    }

    // hop over one column at a time
    private getNextColumn(startColumn: number, currentIndex: number) {
        return startColumn + currentIndex;
    }

    public getNextPosition(startPosition: WordPosition, index: number) {
        return {
            row: this.getNextRow(startPosition.row),
            column: this.getNextColumn(startPosition.column, index)
        };
    }
}
