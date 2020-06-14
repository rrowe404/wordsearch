import { Injectable } from '@angular/core';
import { WordBuilderModule } from './WordBuilderModule';
import { WordBuilder } from './WordBuilder';
import { HorizontalWordBuilder } from './HorizontalWordBuilder';
import { WordSearchState } from 'src/Rules/WordSearchState/WordSearchState';
import { LetterWithPosition } from 'src/Rules/LetterWithPosition/LetterWithPosition';
import { VerticalWordBuilder } from './VerticalWordBuilder';
import { WordBuilderResult } from './WordBuilderResult';
import { DiagonalWordBuilder } from './DiagonalWordBuilder';

@Injectable({
    providedIn: WordBuilderModule
})
export class WordBuilderService implements WordBuilder {
    constructor(
        private horizontalWordBuilder: HorizontalWordBuilder,
        private verticalWordBuilder: VerticalWordBuilder,
        private diagonalWordBuilder: DiagonalWordBuilder
    ) {
    }

    build(currentState: WordSearchState, start: LetterWithPosition, end: LetterWithPosition): WordBuilderResult {
        if (this.isHorizontal(start, end)) {
            return this.horizontalWordBuilder.build(currentState, start, end);
        }

        if (this.isVertical(start, end)) {
            return this.verticalWordBuilder.build(currentState, start, end);
        }

        if (this.isDiagonal(start, end)) {
            return this.diagonalWordBuilder.build(currentState, start, end);
        }

        return null;
    }

    private isHorizontal(start: LetterWithPosition, end: LetterWithPosition) {
        return start.row === end.row;
    }

    private isVertical(start: LetterWithPosition, end: LetterWithPosition) {
        return start.column === end.column;
    }

    private isDiagonal(start: LetterWithPosition, end: LetterWithPosition) {
        return start.row - end.row === start.column - end.column ||
               start.row - end.row === end.column - start.column;
    }
}
