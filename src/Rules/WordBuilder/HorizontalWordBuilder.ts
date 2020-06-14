import { WordBuilder } from './WordBuilder';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { LetterWithPosition } from 'src/Rules/LetterWithPosition/LetterWithPosition';
import { Injectable } from '@angular/core';
import { WordBuilderModule } from './WordBuilderModule';
import { StringUtils } from '../StringUtils/StringUtils';

@Injectable({
    providedIn: WordBuilderModule
})
export class HorizontalWordBuilder implements WordBuilder {
    constructor(
        private stringUtils: StringUtils
    ) {
    }

    build(currentState: WordSearchState, start: LetterWithPosition, end: LetterWithPosition): string {
        let row = start.row;
        let word = '';
        let startColumn = Math.min(start.column, end.column);
        let endColumn = Math.max(start.column, end.column);

        let isBackwards = start.column > end.column;

        for (let column = startColumn; column <= endColumn; column++) {
            word += currentState.getValueAt(row, column);
        }

        return isBackwards ? this.stringUtils.reverseWord(word) : word;
    }
}
