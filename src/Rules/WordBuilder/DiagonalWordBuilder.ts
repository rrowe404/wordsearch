import { WordBuilder } from './WordBuilder';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { StringUtils } from '../StringUtils/StringUtils';
import { WordBuilderResult } from './WordBuilderResult';
import { Position } from '../Position/Position';

export class DiagonalWordBuilder implements WordBuilder {
  private stringUtils = new StringUtils();

  build(
    currentState: WordSearchState,
    start: Position,
    end: Position
  ): WordBuilderResult {
    let result: WordBuilderResult;

    const isTopDown = this.isTopDown(start, end);

    if (isTopDown) {
      result = this.buildTopDown(currentState, start, end);
    } else {
      result = this.buildBottomUp(currentState, start, end);
    }

    const isBackwards = isTopDown
      ? start.row > end.row && start.column > end.column
      : start.row > end.row && start.column < end.column;

    return {
      word: isBackwards
        ? this.stringUtils.reverseWord(result.word)
        : result.word,
      lettersWithPositions: result.lettersWithPositions,
    };
  }

  shouldUse(start: Position, end: Position) {
    return (
      start.row - end.row === start.column - end.column ||
      start.row - end.row === end.column - start.column
    );
  }

  private isTopDown(start: Position, end: Position) {
    return (
      (start.row < end.row && start.column < end.column) ||
      (start.row > end.row && start.column > end.column)
    );
  }

  private buildTopDown(
    currentState: WordSearchState,
    start: Position,
    end: Position
  ) {
    let word = '';

    const startRow = Math.min(start.row, end.row);
    const endRow = Math.max(start.row, end.row);

    const startColumn = Math.min(start.column, end.column);

    let column = startColumn;
    const lettersWithPositions = [];

    for (let row = startRow; row <= endRow; row++) {
      const letter = currentState.getValueAt(row, column);
      word += letter;
      lettersWithPositions.push({ letter, row, column });
      column++;
    }

    return {
      word,
      lettersWithPositions,
    };
  }

  private buildBottomUp(
    currentState: WordSearchState,
    start: Position,
    end: Position
  ) {
    let word = '';

    const startRow = Math.min(start.row, end.row);
    const endRow = Math.max(start.row, end.row);

    const startColumn = Math.max(start.column, end.column);

    let column = startColumn;
    const lettersWithPositions = [];

    for (let row = startRow; row <= endRow; row++) {
      const letter = currentState.getValueAt(row, column);
      word += letter;
      lettersWithPositions.push({ letter, row, column });
      column--;
    }

    return {
      word,
      lettersWithPositions,
    };
  }
}
