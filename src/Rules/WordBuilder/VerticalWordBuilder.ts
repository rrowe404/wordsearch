import { WordBuilder } from './WordBuilder';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { StringUtils } from '../StringUtils/StringUtils';
import { WordBuilderResult } from './WordBuilderResult';
import { Position } from '../Position/Position';

export class VerticalWordBuilder implements WordBuilder {
  private stringUtils: StringUtils = new StringUtils();

  build(
    currentState: WordSearchState,
    start: Position,
    end: Position
  ): WordBuilderResult {
    const lettersWithPositions = [];
    const column = start.column;
    let word = '';
    const startRow = Math.min(start.row, end.row);
    const endRow = Math.max(start.row, end.row);

    const isBackwards = start.row > end.row;

    for (let row = startRow; row <= endRow; row++) {
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
    return start.column === end.column;
  }
}
