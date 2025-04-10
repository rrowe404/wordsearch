import { TestUtils } from '../TestUtils/TestUtils';
import { WordSearchGenerationOptions } from '../WordSearchGenerationOptions/WordSearchGenerationOptions';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { LetterCasingService } from './LetterCasingService';

describe('LetterCasingService', () => {
  let service: LetterCasingService;

  function createState(
    matrix: string[][],
    options?: WordSearchGenerationOptions
  ): WordSearchState {
    const state = new WordSearchState();
    options = options || TestUtils.createOptions(matrix);
    state.setOptions(options);
    state.seedMatrix(matrix);

    return state;
  }

  beforeEach(() => {
    service = new LetterCasingService();
  });

  it('should exist', () => {
    expect(service).toBeTruthy();
  });

  it('should not modify the original', () => {
    const matrix = [
      ['a', 'b', 'c'],
      ['d', 'e', 'f'],
      ['g', 'h', 'i'],
    ];

    const state = createState(matrix);

    const result = service.case(state);

    expect(state).not.toBe(result);
    expect(state.matrix[0][0]).toBe('a');
    expect(result.matrix[0][0]).toBe('A');
  });
});
