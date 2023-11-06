import { VerticalWordSearchStateSlicer } from './VerticalWordSearchStateSlicer';
import { WordSearchStateSlicerTestHelpers } from './WordSearchStateSlicerTestHelpers';

describe('VerticalWordSearchStateSlicer', () => {
  let service: VerticalWordSearchStateSlicer;

  beforeEach(() => {
    service = new VerticalWordSearchStateSlicer();
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
    expect(row0[0].letter).toBe('a');
    expect(row0[1].letter).toBe('c');

    const row1 = slice[1];
    expect(row1[0].letter).toBe('b');
    expect(row1[1].letter).toBe('d');
  });

  it('should handle non-square matrices that have more columns than rows', () => {
    const matrix = [
      ['a', 'b', 'c'],
      ['d', 'e', 'f'],
    ];

    const slice = WordSearchStateSlicerTestHelpers.getSlice(service, matrix);

    const row0 = slice[0];
    expect(row0[0].letter).toBe('a');
    expect(row0[1].letter).toBe('d');

    const row1 = slice[1];
    expect(row1[0].letter).toBe('b');
    expect(row1[1].letter).toBe('e');

    const row2 = slice[2];
    expect(row2[0].letter).toBe('c');
    expect(row2[1].letter).toBe('f');
  });

  it('should handle non-square matrices that have more rows than columns', () => {
    const matrix = [
      ['a', 'b'],
      ['c', 'd'],
      ['e', 'f'],
    ];

    const slice = WordSearchStateSlicerTestHelpers.getSlice(service, matrix);

    const row0 = slice[0];
    expect(row0[0].letter).toBe('a');
    expect(row0[1].letter).toBe('c');
    expect(row0[2].letter).toBe('e');

    const row1 = slice[1];
    expect(row1[0].letter).toBe('b');
    expect(row1[1].letter).toBe('d');
    expect(row1[2].letter).toBe('f');
  });
});
