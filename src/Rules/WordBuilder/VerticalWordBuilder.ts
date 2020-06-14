import { WordBuilder } from './WordBuilder';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { LetterWithPosition } from 'src/Rules/LetterWithPosition/LetterWithPosition';
import { Injectable } from '@angular/core';
import { WordBuilderModule } from './WordBuilderModule';
import { StringUtils } from '../StringUtils/StringUtils';
import { WordBuilderResult } from './WordBuilderResult';

@Injectable({
    providedIn: WordBuilderModule
})
export class VerticalWordBuilder implements WordBuilder {
    constructor(
        private stringUtils: StringUtils
    ) {
    }

    build(currentState: WordSearchState, start: LetterWithPosition, end: LetterWithPosition): WordBuilderResult {
        let lettersWithPositions = [];
        let column = start.column;
        let word = '';
        let startRow = Math.min(start.row, end.row);
        let endRow = Math.max(start.row, end.row);

        let isBackwards = start.row > end.row;

        for (let row = startRow; row <= endRow; row++) {
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
}
