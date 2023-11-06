import { VerticalWordBuilder } from './VerticalWordBuilder';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { TestUtils } from '../TestUtils/TestUtils';

describe('VerticalWordBuilder', () => {
  let service: VerticalWordBuilder;

  function createState(matrix: string[][]): WordSearchState {
    const state = new WordSearchState();
    const options = TestUtils.createOptions(matrix);
    state.setOptions(options);
    state.seedMatrix(matrix);

    return state;
  }

  beforeEach(() => {
    service = new VerticalWordBuilder();
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should correctly identify a forwards word', () => {
    const matrix = [
      ['w', 't', 'h'],
      ['a', 'h', 'e'],
      ['t', 'e', 'c'],
    ];

    const state = createState(matrix);
    const start = { letter: 'w', row: 0, column: 0 };
    const end = { letter: 't', row: 2, column: 0 };

    const result = service.build(state, start, end);

    const expectedLettersWithPositions = [
      start,
      { letter: 'a', row: 1, column: 0 },
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
      ['t', 't', 'h'],
      ['a', 'h', 'e'],
      ['w', 'e', 'c'],
    ];

    const state = createState(matrix);
    const start = { letter: 'w', row: 2, column: 0 };
    const end = { letter: 't', row: 0, column: 0 };

    const result = service.build(state, start, end);

    const expectedLettersWithPositions = [
      end,
      { letter: 'a', row: 1, column: 0 },
      start,
    ];

    expect(result.word).toBe('wat');
    TestUtils.testArrayEquivalency(
      result.lettersWithPositions,
      expectedLettersWithPositions
    );
  });
});
