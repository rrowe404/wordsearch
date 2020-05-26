import { TestBed, async } from '@angular/core/testing';
import { TopLeftToBottomRightDiagonalWordSearchStateSlicer } from './TopLeftToBottomRightDiagonalWordSearchStateSlicer';
import { WordSearchStateSlicerModule } from './WordSearchStateSlicerModule';
import { WordSearchStateSlicerTestHelpers } from './WordSearchStateSlicerTestHelpers';

describe('TopLeftToBottomRightDiagonalWordSearchStateSlicer', () => {
    let service: TopLeftToBottomRightDiagonalWordSearchStateSlicer;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                WordSearchStateSlicerModule
            ]
        });

        service = TestBed.get(TopLeftToBottomRightDiagonalWordSearchStateSlicer);
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

        let row1 = slice[1];
        expect(row1[0].letter).toBe('c');
        expect(row1[1].letter).toBe('b');

        let row2 = slice[2];
        expect(row2[0].letter).toBe('d');
    });
});