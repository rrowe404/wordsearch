import { TestBed, async } from '@angular/core/testing';
import { BottomLeftToTopRightDiagonalWordSearchStateSlicer } from './BottomLeftToTopRightDiagonalWordSearchStateSlicer';
import { WordSearchStateSlicerModule } from './WordSearchStateSlicerModule';
import { WordSearchStateSlicerTestHelpers } from './WordSearchStateSlicerTestHelpers';

describe('BottomLeftToTopRightDiagonalWordSearchStateSlicer', () => {
    let service: BottomLeftToTopRightDiagonalWordSearchStateSlicer;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                WordSearchStateSlicerModule
            ]
        });

        service = TestBed.get(BottomLeftToTopRightDiagonalWordSearchStateSlicer);
    }));

    it('should create the service', () => {
        expect(service).toBeTruthy();
    });

    it ('should slice correctly', () => {
        let matrix = [
            ['a', 'b'],
            ['c', 'd']
        ];

        let slice = WordSearchStateSlicerTestHelpers.getSlice(service, matrix);

        let row0 = slice[0];
        expect(row0[0].letter).toBe('c');

        let row1 = slice[1];
        expect(row1[0].letter).toBe('d');
        expect(row1[1].letter).toBe('a');

        let row2 = slice[2];
        expect(row2[0].letter).toBe('b');
    });

    it('should handle non-square matrices that have more columns than rows', () => {
        let matrix = [
            ['a', 'b', 'c'],
            ['d', 'e', 'f']
        ];

        let slice = WordSearchStateSlicerTestHelpers.getSlice(service, matrix);

        let row0 = slice[0];
        expect(row0[0].letter).toBe('d');

        let row1 = slice[1];
        expect(row1[0].letter).toBe('e');
        expect(row1[1].letter).toBe('a');

        let row2 = slice[2];
        expect(row2[0].letter).toBe('f');
        expect(row2[1].letter).toBe('b');

        let row3 = slice[3];
        expect(row3[0].letter).toBe('c');
    });

    it('should handle non-square matrices that have more rows than columns', () => {
        let matrix = [
            ['a', 'b'],
            ['c', 'd'],
            ['e', 'f']
        ];

        let slice = WordSearchStateSlicerTestHelpers.getSlice(service, matrix);

        let row0 = slice[0];
        expect(row0[0].letter).toBe('e');

        let row1 = slice[1];
        expect(row1[0].letter).toBe('f');
        expect(row1[1].letter).toBe('c');

        let row2 = slice[2];
        expect(row2[0].letter).toBe('d');
        expect(row2[1].letter).toBe('a');

        let row3 = slice[3];
        expect(row3[0].letter).toBe('b');
    });
});
