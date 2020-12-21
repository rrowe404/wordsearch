import { WordPositionService } from './WordPositionService';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { WordPosition } from './WordPosition';

/** Abstract base class for the directional services, to extract the common logic */
export abstract class WordPositionServiceBase {
    protected abstract getNextRow(startRow: number, index: number);
    protected abstract getNextColumn(startColumn: number, index: number);
    protected abstract isOutOfBounds(currentState: WordSearchState, startPosition: WordPosition, word: string);

    private wordPositionService = new WordPositionService();

    public getNextPosition(startPosition: WordPosition, index: number) {
        return {
            row: this.getNextRow(startPosition.row, index),
            column: this.getNextColumn(startPosition.column, index)
        };
    }

    public getValidStartPositions(currentState: WordSearchState, word: string): WordPosition[] {
        let getNextPosition = (start: WordPosition, index: number) => {
            return this.getNextPosition(start, index);
        };

        let isOutOfBounds = (start: WordPosition) => {
            return this.isOutOfBounds(currentState, start, word);
        };

        return this.wordPositionService.getValidStartPositions(currentState, getNextPosition, isOutOfBounds, word);
    }
}
