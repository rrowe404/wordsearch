import { WordBuilder } from './WordBuilder';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { LetterWithPosition } from 'src/Rules/LetterWithPosition/LetterWithPosition';
import { StringUtils } from '../StringUtils/StringUtils';
import { WordBuilderResult } from './WordBuilderResult';
import { Injectable } from '@angular/core';

@Injectable()
export class DiagonalWordBuilder implements WordBuilder {
    constructor(
        private stringUtils: StringUtils
    ) {
    }

    build(currentState: WordSearchState, start: LetterWithPosition, end: LetterWithPosition): WordBuilderResult {
        let result: WordBuilderResult;

        let isTopDown = this.isTopDown(start, end);

        if (isTopDown) {
            result = this.buildTopDown(currentState, start, end);
        } else {
            result = this.buildBottomUp(currentState, start, end);
        }

        let isBackwards = isTopDown ?
                          start.row > end.row && start.column > end.column :
                          start.row > end.row && start.column < end.column;

        return {
            word: isBackwards ? this.stringUtils.reverseWord(result.word) : result.word,
            lettersWithPositions: result.lettersWithPositions
        };
    }

    shouldUse(start: LetterWithPosition, end: LetterWithPosition) {
        return start.row - end.row === start.column - end.column ||
               start.row - end.row === end.column - start.column;
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
        let lettersWithPositions = [];

        for (let row = startRow; row <= endRow; row++) {
            let letter = currentState.getValueAt(row, column);
            word += letter;
            lettersWithPositions.push({ letter, row, column });
            column++;
        }


        return {
            word,
            lettersWithPositions
        };
    }

    private buildBottomUp(currentState: WordSearchState, start: LetterWithPosition, end: LetterWithPosition) {
        let word = '';

        let startRow = Math.min(start.row, end.row);
        let endRow = Math.max(start.row, end.row);

        let startColumn = Math.max(start.column, end.column);

        let column = startColumn;
        let lettersWithPositions = [];

        for (let row = startRow; row <= endRow; row++) {
            let letter = currentState.getValueAt(row, column);
            word += letter;
            lettersWithPositions.push({ letter, row, column });
            column--;
        }

        return {
            word,
            lettersWithPositions
        };
    }
}
