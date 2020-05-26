import { TestBed, async } from '@angular/core/testing';
import { HorizontalWordSearchStateSlicer } from './HorizontalWordSearchStateSlicer';
import { WordSearchStateSlicerModule } from './WordSearchStateSlicerModule';
import { WordSearchState } from '../WordSearchState/WordSearchState';

describe('HorizontalWordSearchStateSlicer', () => {
    let service: HorizontalWordSearchStateSlicer;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                WordSearchStateSlicerModule
            ]
        });

        service = TestBed.get(HorizontalWordSearchStateSlicer);
    }));

    it('should create the service', () => {
        expect(service).toBeTruthy();
    });

    it ('should slice correctly', () => {
        let matrix = [
            ['a', 'b'],
            ['c', 'd']
        ];

        let state = new WordSearchState();
        state.setOptions({
            alphabetizeWordList: false,
            height: matrix.length,
            width: matrix[0].length,
            showWordList: false,
            title: '',
            words: []
        });
        state.seedMatrix(matrix);

        let lettersWithPositions = state.getLettersWithPositions();
        let slice = service.createSlice(state, lettersWithPositions);

        let row0 = slice[0];
        expect(row0[0].letter).toBe('a');
        expect(row0[1].letter).toBe('b');

        let row1 = slice[1];
        expect(row1[0].letter).toBe('c');
        expect (row1[1].letter).toBe('d');
    });
});