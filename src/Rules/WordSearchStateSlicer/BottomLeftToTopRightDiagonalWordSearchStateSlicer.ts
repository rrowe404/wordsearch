import { WordSearchStateSlicer } from './WordSearchStateSlicer';
import { Injectable } from '@angular/core';
import { WordSearchStateSlicerModule } from './WordSearchStateSlicerModule';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { LetterWithPosition } from '../LetterWithPosition/LetterWithPosition';
import { DiagonalWordSearchStateSlicer } from './DiagonalWordSearchStateSlicer';

/**
 * the most complex.
 * [q, m, c]
 * [j, n, b]
 * [p, i, g]
 * should become
 * [p] *
 * [i, j], *
 * [g, n, q],
 * [b, m],
 * [c]
 */
@Injectable({
    providedIn: WordSearchStateSlicerModule
})
export class BottomLeftToTopRightDiagonalWordSearchStateSlicer implements WordSearchStateSlicer {
    createSlice(currentState: WordSearchState, lettersWithPositions: LetterWithPosition[]): LetterWithPosition[][] {
        return new DiagonalWordSearchStateSlicer().setBottomsUp().createSlice(currentState, lettersWithPositions);
    }
}
