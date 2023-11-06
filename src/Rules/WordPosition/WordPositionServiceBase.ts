import { WordPositionService } from './WordPositionService';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { WordPosition } from './WordPosition';
import { Position } from '../Position/Position';

/** Abstract base class for the directional services, to extract the common logic */
export abstract class WordPositionServiceBase {
  private wordPositionService = new WordPositionService();

  protected abstract getNextRow(startRow: number, index: number): number;
  protected abstract getNextColumn(startColumn: number, index: number): number;
  protected abstract isOutOfBounds(
    currentState: WordSearchState,
    startPosition: WordPosition,
    word: string
  ): boolean;

  public getNextPosition(startPosition: WordPosition, index: number): Position {
    return {
      row: this.getNextRow(startPosition.row, index),
      column: this.getNextColumn(startPosition.column, index),
    };
  }

  public getValidStartPositions(
    currentState: WordSearchState,
    word: string
  ): WordPosition[] {
    const getNextPosition = (start: WordPosition, index: number) => {
      return this.getNextPosition(start, index);
    };

    const isOutOfBounds = (start: WordPosition) => {
      return this.isOutOfBounds(currentState, start, word);
    };

    return this.wordPositionService.getValidStartPositions(
      currentState,
      getNextPosition,
      isOutOfBounds,
      word
    );
  }
}
