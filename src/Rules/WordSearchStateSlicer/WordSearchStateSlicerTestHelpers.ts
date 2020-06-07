import { WordSearchStateSlicer } from './WordSearchStateSlicer';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { TestUtils } from '../TestUtils/TestUtils';

/** Common logic for testing WordSearchStateSlicers */
export class WordSearchStateSlicerTestHelpers {
    public static getSlice(slicer: WordSearchStateSlicer, matrix: string[][]) {
        let state = new WordSearchState();
        state.setOptions(TestUtils.createOptions(matrix));
        state.seedMatrix(matrix);

        let lettersWithPositions = state.getLettersWithPositions();
        let slice = slicer.createSlice(state, lettersWithPositions);

        return slice;
    }
}
