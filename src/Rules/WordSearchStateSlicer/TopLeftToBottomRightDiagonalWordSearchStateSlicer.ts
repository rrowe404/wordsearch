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
 * [q] *
 * [j, m], *
 * [p, n, c],
 * [i, b],
 * [g]
 */
@Injectable({
    providedIn: WordSearchStateSlicerModule
})
export class TopLeftToBottomRightDiagonalWordSearchStateSlicer implements WordSearchStateSlicer {
    createSlice(currentState: WordSearchState, lettersWithPositions: LetterWithPosition[]): import("../LetterWithPosition/LetterWithPosition").LetterWithPosition[][] {
        // totally stolen from https://stackoverflow.com/questions/35917734/how-do-i-traverse-an-array-diagonally-in-javascript
        // what, you thought I wanted to think about this?? :D :D :D
        let slice = [];

        let yLength = currentState.rows;
        let xLength = currentState.columns;
        let maxLength = Math.max(yLength, xLength);
        
        let temp;
        
        for (let i = 0; i <= 2 * maxLength; ++i) {
            temp = [];

            for (let y = yLength - 1; y >= 0; --y) {
                let x = i - y;

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
