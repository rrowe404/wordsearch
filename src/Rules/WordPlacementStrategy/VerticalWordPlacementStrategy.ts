import { Injectable } from '@angular/core';
import { WordPlacementStrategy } from './WordPlacementStrategy';
import { WordPlacementStrategyBase } from './WordPlacementStrategyBase';
import { WordPlacementStrategyModule } from './WordPlacementStrategyModule';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { WordPosition } from '../WordPosition/WordPosition';

@Injectable({
    providedIn: WordPlacementStrategyModule
})
export class VerticalWordPlacementStrategy extends WordPlacementStrategyBase implements WordPlacementStrategy {
    // allow enough room in the rows for the full word
    private getStartRow(currentState: WordSearchState, word: string) {
        return this.randomNumberGeneratorService.generateRandomIntWithMax(currentState.rows - word.length);
    }

    // any column will do
    private getStartColumn(currentState: WordSearchState, word: string) {
        return this.randomNumberGeneratorService.generateRandomIntWithMax(currentState.columns);
    }

    public getStartPosition(currentState: WordSearchState, word: string) {
        return { column: this.getStartColumn(currentState, word), row: this.getStartRow(currentState, word) };
    }

    // hop over one row at a time
    private getNextRow(startRow: number, currentIndex: number) {
        return startRow + currentIndex;
    }

    // always the same
    private getNextColumn(startRow: number) {
        return startRow;
    }

    public getNextPosition(startPosition: WordPosition, index: number) {
        return {
            row: this.getNextRow(startPosition.row, index),
            column: this.getNextColumn(startPosition.column)
        };
    }
}
