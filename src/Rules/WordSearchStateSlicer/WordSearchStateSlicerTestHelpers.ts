import { WordSearchStateSlicer } from './WordSearchStateSlicer';
import { WordSearchState } from '../WordSearchState/WordSearchState';

/** Common logic for testing WordSearchStateSlicers */
export class WordSearchStateSlicerTestHelpers {
    public static getSlice(slicer: WordSearchStateSlicer, matrix: string[][]) {
        let state = new WordSearchState();
        state.setOptions({
            alphabetizeWordList: false,
            height: matrix.length,
            width: matrix[0].length,
            showWordList: false,
            title: '',
            words: [],
            filterAccidentalProfanity: false
        });
        state.seedMatrix(matrix);

        let lettersWithPositions = state.getLettersWithPositions();
        let slice = slicer.createSlice(state, lettersWithPositions);

        return slice;
    }
}
