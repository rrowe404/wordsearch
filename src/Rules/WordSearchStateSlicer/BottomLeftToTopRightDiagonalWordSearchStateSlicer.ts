import { WordSearchStateSlicer } from './WordSearchStateSlicer';
import { Injectable } from '@angular/core';
import { WordSearchStateSlicerModule } from './WordSearchStateSlicerModule';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { LetterWithPosition } from '../LetterWithPosition/LetterWithPosition';

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
    createSlice(currentState: WordSearchState, lettersWithPositions: LetterWithPosition[]): import("../LetterWithPosition/LetterWithPosition").LetterWithPosition[][] {
        // this had to be modified further from the other implementation on stackOverflow because
        // the given answer skipped the last letter. will recombine after writing tests.
        let slice = [];

        let yLength = currentState.rows;
        let xLength = currentState.columns;
        let maxLength = Math.max(yLength, xLength);
        
        let temp;

        for (let i = 0; i <= 2 * maxLength; ++i) {
            temp = [];

            for (let y = yLength - 1; y >= 0; --y) {
                // this is the different line...
                let x = i - (yLength - y);

                if (x >= 0 && x < xLength) {
                    temp.push(lettersWithPositions.filter(lwp => lwp.row === y && lwp.column === x)[0]);
                }
            }

            if (temp.length) {
                slice.push(temp);
            }
        }

        return slice;
    }
}
