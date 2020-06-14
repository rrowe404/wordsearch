import { WordBuilder } from './WordBuilder';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { LetterWithPosition } from 'src/Rules/LetterWithPosition/LetterWithPosition';
import { Injectable } from '@angular/core';
import { WordBuilderModule } from './WordBuilderModule';
import { StringUtils } from '../StringUtils/StringUtils';

@Injectable({
    providedIn: WordBuilderModule
})
export class VerticalWordBuilder implements WordBuilder {
    constructor(
        private stringUtils: StringUtils
    ) {
    }

    build(currentState: WordSearchState, start: LetterWithPosition, end: LetterWithPosition): string {
        let column = start.column;
        let word = '';
        let startRow = Math.min(start.row, end.row);
        let endRow = Math.max(start.row, end.row);

        let isBackwards = start.row > end.row;

        for (let row = startRow; row <= endRow; row++) {
            word += currentState.getValueAt(row, column);
        }

        return isBackwards ? this.stringUtils.reverseWord(word) : word;
    }
}
