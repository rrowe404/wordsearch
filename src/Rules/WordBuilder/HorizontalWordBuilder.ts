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
    let lettersWithPositions = [];
    let row = start.row;
    let word = '';
    let startColumn = Math.min(start.column, end.column);
    let endColumn = Math.max(start.column, end.column);

    let isBackwards = start.column > end.column;

    for (let column = startColumn; column <= endColumn; column++) {
      let letter = currentState.getValueAt(row, column);
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
