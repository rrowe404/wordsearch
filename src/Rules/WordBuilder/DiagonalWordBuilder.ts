import { WordBuilder } from './WordBuilder';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { LetterWithPosition } from 'src/Rules/LetterWithPosition/LetterWithPosition';
import { Injectable } from '@angular/core';
import { WordBuilderModule } from './WordBuilderModule';
import { StringUtils } from '../StringUtils/StringUtils';

@Injectable({
    providedIn: WordBuilderModule
})
export class DiagonalWordBuilder implements WordBuilder {
    constructor(
        private stringUtils: StringUtils
    ) {
    }

    build(currentState: WordSearchState, start: LetterWithPosition, end: LetterWithPosition): string {
        let word = '';

        let isTopDown = this.isTopDown(start, end);

        if (isTopDown) {
            word = this.buildTopDown(currentState, start, end);
        } else {
            word = this.buildBottomUp(currentState, start, end);
        }

        let isBackwards = isTopDown ?
                          start.row > end.row && start.column > end.column :
                          start.row > end.row && start.column < end.column;

        return isBackwards ? this.stringUtils.reverseWord(word) : word;
    }

    private isTopDown(start: LetterWithPosition, end: LetterWithPosition) {
        return (start.row < end.row && start.column < end.column) ||
               (start.row > end.row && start.column > end.column);
    }

    private buildTopDown(currentState: WordSearchState, start: LetterWithPosition, end: LetterWithPosition) {
        let word = '';

        let startRow = Math.min(start.row, end.row);
        let endRow = Math.max(start.row, end.row);

        let startColumn = Math.min(start.column, end.column);

        let column = startColumn;

        for (let row = startRow; row <= endRow; row++) {
            word += currentState.getValueAt(row, column++);
        }

        return word;
    }

    private buildBottomUp(currentState: WordSearchState, start: LetterWithPosition, end: LetterWithPosition) {
        let word = '';

        let startRow = Math.min(start.row, end.row);
        let endRow = Math.max(start.row, end.row);

        let startColumn = Math.max(start.column, end.column);

        let column = startColumn;

        for (let row = startRow; row <= endRow; row++) {
            word += currentState.getValueAt(row, column--);
        }

        return word;
    }
}
