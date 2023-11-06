import { WordBuilder } from './WordBuilder';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { StringUtils } from '../StringUtils/StringUtils';
import { WordBuilderResult } from './WordBuilderResult';
import { Position } from '../Position/Position';

export class HorizontalWordBuilder implements WordBuilder {
  private stringUtils = new StringUtils();

  build(
    currentState: WordSearchState,
    start: Position,
    end: Position
  ): WordBuilderResult {
    const lettersWithPositions = [];
    const row = start.row;
    let word = '';
    const startColumn = Math.min(start.column, end.column);
    const endColumn = Math.max(start.column, end.column);

    const isBackwards = start.column > end.column;

    for (let column = startColumn; column <= endColumn; column++) {
      const letter = currentState.getValueAt(row, column);
      word += letter;
      lettersWithPositions.push({ letter, row, column });
    }

    word = isBackwards ? this.stringUtils.reverseWord(word) : word;

    return {
      word,
      lettersWithPositions,
    };
  }

  shouldUse(start: Position, end: Position) {
    return start.row === end.row;
  }
}
