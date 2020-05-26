import { WordSearchState } from '../WordSearchState/WordSearchState';
import { LetterWithPosition } from '../LetterWithPosition/LetterWithPosition';

/** Used to create different views of the current state for examination of the contents */
export interface WordSearchStateSlicer {
    createSlice(currentState: WordSearchState, lettersWithPositions: Array<LetterWithPosition>): Array<Array<LetterWithPosition>>
}
