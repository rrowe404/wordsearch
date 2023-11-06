import { DiagonalWordBuilder } from './DiagonalWordBuilder';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { TestUtils } from '../TestUtils/TestUtils';

describe('DiagonalWordBuilder', () => {
  let service: DiagonalWordBuilder;

  function createState(matrix: string[][]): WordSearchState {
    const state = new WordSearchState();
    const options = TestUtils.createOptions(matrix);
    state.setOptions(options);
    state.seedMatrix(matrix);

    return state;
  }

  beforeEach(() => {
    service = new DiagonalWordBuilder();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should correctly identify a top-down forwards word', () => {
    const matrix = [
      ['w', 'h', 't'],
      ['h', 'a', 'e'],
      ['c', 'e', 't'],
    ];

    const state = createState(matrix);
    const start = { letter: 'w', row: 0, column: 0 };
    const end = { letter: 't', row: 2, column: 2 };

    const result = service.build(state, start, end);

    const expectedLettersWithPositions = [
      start,
      { letter: 'a', row: 1, column: 1 },
      end,
    ];

    expect(result.word).toBe('wat');
    TestUtils.testArrayEquivalency(
      result.lettersWithPositions,
      expectedLettersWithPositions
    );
  });

  it('should correctly identify a top-down backwards word', () => {
    const matrix = [
      ['t', 'h', 't'],
      ['h', 'a', 'e'],
      ['c', 'e', 'w'],
    ];

    const state = createState(matrix);
    const start = { letter: 'w', row: 2, column: 2 };
    const end = { letter: 't', row: 0, column: 0 };

    const result = service.build(state, start, end);

    const expectedLettersWithPositions = [
      end,
      { letter: 'a', row: 1, column: 1 },
      start,
    ];

    expect(result.word).toBe('wat');
    TestUtils.testArrayEquivalency(
      result.lettersWithPositions,
      expectedLettersWithPositions
    );
  });

  it('should correctly identify a bottom-up forwards word', () => {
    const matrix = [
      ['t', 'e', 't'],
      ['h', 'a', 'e'],
      ['w', 'h', 'c'],
    ];

    const state = createState(matrix);
    const start = { letter: 'w', row: 2, column: 0 };
    const end = { letter: 't', row: 0, column: 2 };

    const result = service.build(state, start, end);

    const expectedLettersWithPositions = [
      end,
      { letter: 'a', row: 1, column: 1 },
      start,
    ];

    expect(result.word).toBe('wat');
    TestUtils.testArrayEquivalency(
      result.lettersWithPositions,
      expectedLettersWithPositions
    );
  });

  it('should correctly identify a bottom-up backwards word', () => {
    const matrix = [
      ['t', 'e', 'w'],
      ['h', 'a', 'e'],
      ['t', 'h', 'c'],
    ];

    const state = createState(matrix);
    const start = { letter: 'w', row: 0, column: 2 };
    const end = { letter: 't', row: 2, column: 0 };

    const result = service.build(state, start, end);

    const expectedLettersWithPositions = [
      start,
      { letter: 'a', row: 1, column: 1 },
      end,
    ];

    expect(result.word).toBe('wat');
    TestUtils.testArrayEquivalency(
      result.lettersWithPositions,
      expectedLettersWithPositions
    );
  });
});
