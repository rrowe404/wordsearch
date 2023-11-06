import { VerticalWordPositionService } from './VerticalWordPositionService';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { TestUtils } from '../TestUtils/TestUtils';
import { LetterPlaceholder } from '../LetterPlaceholder/LetterPlaceholder';
import { WordPosition } from './WordPosition';

describe('VerticalWordPositionService', () => {
  let service: VerticalWordPositionService;

  function createState(matrix: string[][]): WordSearchState {
    const state = new WordSearchState();
    const options = TestUtils.createOptions(matrix);
    state.setOptions(options);
    state.seedMatrix(matrix);

    return state;
  }

  beforeEach(() => {
    service = new VerticalWordPositionService();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should return valid data for a blank matrix', () => {
    const n = LetterPlaceholder.value;

    const matrix = [
      [n, n, n],
      [n, n, n],
      [n, n, n],
    ];

    const state = createState(matrix);

    const word = 'pig';

    const result = service.getValidStartPositions(state, word);

    const expected: WordPosition[] = [
      { row: 0, column: 0 },
      { row: 0, column: 1 },
      { row: 0, column: 2 },
    ];

    TestUtils.testArrayEquivalency(result, expected);
  });

  it('should return valid data for a matrix with overlaps', () => {
    const n = LetterPlaceholder.value;

    const matrix = [
      [n, n, n],
      [n, 'i', n],
      [n, n, n],
    ];

    const state = createState(matrix);

    const word = 'pig';

    const result = service.getValidStartPositions(state, word);

    const expected: WordPosition[] = [
      { row: 0, column: 0 },
      { row: 0, column: 1, hasOverlaps: true },
      { row: 0, column: 2 },
    ];

    TestUtils.testArrayEquivalency(result, expected);
  });
});
