import { jest } from '@jest/globals';
import { TestUtils } from '../TestUtils/TestUtils';
import { WordSearchGenerationOptions } from '../WordSearchGenerationOptions/WordSearchGenerationOptions';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { LetterPlaceholder } from './LetterPlaceholder';
import { LetterPlaceholderFillService } from './LetterPlaceholderFillService';

describe('LetterPlaceholderFillService', () => {
  let service: LetterPlaceholderFillService;

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

  function expectCompleteResult(result: WordSearchState) {
    result.iterate((letter) => {
      expect(typeof letter).toBe('string');
      expect(letter).not.toBe(LetterPlaceholder.value);
    });
  }

  beforeEach(() => {
    service = new LetterPlaceholderFillService();
    service.profanityFilterService.setProfanityList(['arm', 'guy']);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fill a partially filled matrix', () => {
    const matrix = [
      ['a', 'b', 'c'],
      ['d', 'e', 'f'],
      ['g', LetterPlaceholder.value, 'i'],
    ];

    const state = createState(matrix);

    const result = service.fill(state);

    expectCompleteResult(result);
  });

  it('should not modify the original', () => {
    const matrix = [
      ['a', 'b', 'c'],
      ['d', 'e', 'f'],
      ['g', LetterPlaceholder.value, 'i'],
    ];

    const state = createState(matrix);

    const result = service.fill(state);

    expect(state).not.toBe(result);
  });

  it('should ensure no profanity remains in the final product if the option is selected', () => {
    const matrix = [
      [
        LetterPlaceholder.value,
        LetterPlaceholder.value,
        LetterPlaceholder.value,
      ],
      ['d', 'e', 'u'],
      ['g', 'f', 'y'],
    ];

    // this spy ensures that
    // even if profanity is replaced with more profanity,
    // it still gets filtered in the end
    jest
      .spyOn(service, 'getFillLetter')
      .mockReturnValueOnce('a')
      .mockReturnValueOnce('r')
      .mockReturnValueOnce('m')
      .mockReturnValueOnce('a')
      .mockReturnValueOnce('r')
      .mockReturnValueOnce('m')
      .mockReturnValueOnce('l')
      .mockReturnValueOnce('e')
      .mockReturnValueOnce('g')
      .mockReturnValueOnce('g')
      .mockReturnValueOnce('e')
      .mockReturnValueOnce('l');

    const options = TestUtils.createOptions(matrix);
    options.filterAccidentalProfanity = true;

    const state = createState(matrix, options);

    const result = service.fill(state);
    const filteredResult = service.profanityFilterService.filterProfanity(
      result,
      []
    );

    expect(filteredResult).toBeFalsy();
    expectCompleteResult(result);
  });
});
