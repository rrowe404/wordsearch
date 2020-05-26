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
});