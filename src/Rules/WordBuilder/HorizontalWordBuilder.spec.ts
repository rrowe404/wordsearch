import { HorizontalWordBuilder } from './HorizontalWordBuilder';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { TestUtils } from '../TestUtils/TestUtils';

describe('HorizontalWordBuilder', () => {
  let service: HorizontalWordBuilder;

  function createState(matrix: string[][]): WordSearchState {
    const state = new WordSearchState();
    const options = TestUtils.createOptions(matrix);
    state.setOptions(options);
    state.seedMatrix(matrix);

    return state;
  }

  beforeEach(() => {
    service = new HorizontalWordBuilder();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should correctly identify a forwards word', () => {
    const matrix = [
      ['w', 'a', 't'],
      ['t', 'h', 'e'],
      ['h', 'e', 'c'],
    ];

    const state = createState(matrix);
    const start = { letter: 'w', row: 0, column: 0 };
    const end = { letter: 't', row: 0, column: 2 };

    const result = service.build(state, start, end);

    const expectedLettersWithPositions = [
      start,
      { letter: 'a', row: 0, column: 1 },
      end,
    ];

    expect(result.word).toBe('wat');
    TestUtils.testArrayEquivalency(
      result.lettersWithPositions,
      expectedLettersWithPositions
    );
  });

  it('should correctly identify a backwards word', () => {
    const matrix = [
      ['t', 'a', 'w'],
      ['t', 'h', 'e'],
      ['h', 'e', 'c'],
    ];

    const state = createState(matrix);
    const start = { letter: 'w', row: 0, column: 2 };
    const end = { letter: 't', row: 0, column: 0 };

    const result = service.build(state, start, end);

    const expectedLettersWithPositions = [
      end,
      { letter: 'a', row: 0, column: 1 },
      start,
    ];

    expect(result.word).toBe('wat');
    TestUtils.testArrayEquivalency(
      result.lettersWithPositions,
      expectedLettersWithPositions
    );
  });
});
