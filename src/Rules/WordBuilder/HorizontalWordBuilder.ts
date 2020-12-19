import { WordBuilder } from './WordBuilder';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { LetterWithPosition } from 'src/Rules/LetterWithPosition/LetterWithPosition';
import { StringUtils } from '../StringUtils/StringUtils';
import { WordBuilderResult } from './WordBuilderResult';

export class HorizontalWordBuilder implements WordBuilder {
    private stringUtils = new StringUtils();

    build(currentState: WordSearchState, start: LetterWithPosition, end: LetterWithPosition): WordBuilderResult {
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
            lettersWithPositions
        };
    }

    shouldUse(start: LetterWithPosition, end: LetterWithPosition) {
        return start.row === end.row;
    }
}
