import { TestBed, async } from '@angular/core/testing';
import { VerticalWordSearchStateSlicer } from './VerticalWordSearchStateSlicer';
import { WordSearchStateSlicerModule } from './WordSearchStateSlicerModule';
import { WordSearchStateSlicerTestHelpers } from './WordSearchStateSlicerTestHelpers';

describe('VerticalWordSearchStateSlicer', () => {
    let service: VerticalWordSearchStateSlicer;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                WordSearchStateSlicerModule
            ]
        });

        service = TestBed.get(VerticalWordSearchStateSlicer);
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
        expect(row0[0].letter).toBe('a');
        expect(row0[1].letter).toBe('c');

        let row1 = slice[1];
        expect(row1[0].letter).toBe('b');
        expect (row1[1].letter).toBe('d');
    });

    it('should handle non-square matrices that have more columns than rows', () => {
        let matrix = [
            ['a', 'b', 'c'],
            ['d', 'e', 'f']
        ];

        let slice = WordSearchStateSlicerTestHelpers.getSlice(service, matrix);

        let row0 = slice[0];
        expect(row0[0].letter).toBe('a');
        expect(row0[1].letter).toBe('d');

        let row1 = slice[1];
        expect(row1[0].letter).toBe('b');
        expect(row1[1].letter).toBe('e');

        let row2 = slice[2];
        expect(row2[0].letter).toBe('c');
        expect(row2[1].letter).toBe('f');
    });

    it('should handle non-square matrices that have more rows than columns', () => {
        let matrix = [
            ['a', 'b'],
            ['c', 'd'],
            ['e', 'f']
        ];

        let slice = WordSearchStateSlicerTestHelpers.getSlice(service, matrix);

        let row0 = slice[0];
        expect(row0[0].letter).toBe('a');
        expect(row0[1].letter).toBe('c');
        expect(row0[2].letter).toBe('e');

        let row1 = slice[1];
        expect(row1[0].letter).toBe('b');
        expect(row1[1].letter).toBe('d');
        expect(row1[2].letter).toBe('f');
    });
});