import { BottomLeftToTopRightDiagonalWordSearchStateSlicer } from './BottomLeftToTopRightDiagonalWordSearchStateSlicer';
import { WordSearchStateSlicerTestHelpers } from './WordSearchStateSlicerTestHelpers';

describe('BottomLeftToTopRightDiagonalWordSearchStateSlicer', () => {
  let service: BottomLeftToTopRightDiagonalWordSearchStateSlicer;

  beforeEach(() => {
    service = new BottomLeftToTopRightDiagonalWordSearchStateSlicer();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should slice correctly', () => {
    const matrix = [
      ['a', 'b'],
      ['c', 'd'],
    ];

    const slice = WordSearchStateSlicerTestHelpers.getSlice(service, matrix);

    const row0 = slice[0];
    expect(row0[0].letter).toBe('c');

    const row1 = slice[1];
    expect(row1[0].letter).toBe('d');
    expect(row1[1].letter).toBe('a');

    const row2 = slice[2];
    expect(row2[0].letter).toBe('b');
  });

  it('should handle non-square matrices that have more columns than rows', () => {
    const matrix = [
      ['a', 'b', 'c'],
      ['d', 'e', 'f'],
    ];

    const slice = WordSearchStateSlicerTestHelpers.getSlice(service, matrix);

    const row0 = slice[0];
    expect(row0[0].letter).toBe('d');

    const row1 = slice[1];
    expect(row1[0].letter).toBe('e');
    expect(row1[1].letter).toBe('a');

    const row2 = slice[2];
    expect(row2[0].letter).toBe('f');
    expect(row2[1].letter).toBe('b');

    const row3 = slice[3];
    expect(row3[0].letter).toBe('c');
  });

  it('should handle non-square matrices that have more rows than columns', () => {
    const matrix = [
      ['a', 'b'],
      ['c', 'd'],
      ['e', 'f'],
    ];

    const slice = WordSearchStateSlicerTestHelpers.getSlice(service, matrix);

    const row0 = slice[0];
    expect(row0[0].letter).toBe('e');

    const row1 = slice[1];
    expect(row1[0].letter).toBe('f');
    expect(row1[1].letter).toBe('c');

    const row2 = slice[2];
    expect(row2[0].letter).toBe('d');
    expect(row2[1].letter).toBe('a');

    const row3 = slice[3];
    expect(row3[0].letter).toBe('b');
  });
});
