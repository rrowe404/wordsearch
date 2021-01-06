import { WordSearchState } from '../WordSearchState/WordSearchState';
import { WordPosition } from './WordPosition';
import { WordPositionServiceBase } from './WordPositionServiceBase';

export class TopDownDiagonalWordPositionService extends WordPositionServiceBase {
    // hop over one row at a time
    protected getNextRow(startRow: number, currentIndex: number) {
        return startRow + currentIndex;
    }

    protected getNextColumn(startColumn: number, currentIndex: number) {
        return startColumn + currentIndex;
    }

    protected isOutOfBounds(currentState: WordSearchState, startPosition: WordPosition, word: string) {
        return startPosition.row + word.length > currentState.rows ||
               startPosition.column + word.length > currentState.columns;
    }
}
