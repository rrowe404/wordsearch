import { WordSearchStateSlicer } from './WordSearchStateSlicer';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { LetterWithPosition } from '../LetterWithPosition/LetterWithPosition';
import { DiagonalWordSearchStateSlicer } from './DiagonalWordSearchStateSlicer';

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
export class TopLeftToBottomRightDiagonalWordSearchStateSlicer implements WordSearchStateSlicer {
    createSlice(currentState: WordSearchState, lettersWithPositions: LetterWithPosition[]): LetterWithPosition[][] {
        return new DiagonalWordSearchStateSlicer().setTopDown().createSlice(currentState, lettersWithPositions);
    }
}
