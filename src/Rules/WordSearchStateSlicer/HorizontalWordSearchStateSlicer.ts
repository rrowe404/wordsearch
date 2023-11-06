import { WordSearchStateSlicer } from './WordSearchStateSlicer';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { LetterWithPosition } from '../LetterWithPosition/LetterWithPosition';

export class HorizontalWordSearchStateSlicer implements WordSearchStateSlicer {
  createSlice(
    currentState: WordSearchState,
    lettersWithPositions: LetterWithPosition[]
  ): LetterWithPosition[][] {
    const slice: LetterWithPosition[][] = [];

    for (let i = 0; i < currentState.rows; i++) {
      slice.push(lettersWithPositions.filter((lwp) => lwp.row === i));
    }

    return slice;
  }
}
