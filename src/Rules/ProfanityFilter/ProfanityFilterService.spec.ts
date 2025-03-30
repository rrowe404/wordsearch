import { ProfanityFilterService } from './ProfanityFilterService';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { LetterPlaceholder } from '../LetterPlaceholder/LetterPlaceholder';
import { TestUtils } from '../TestUtils/TestUtils';

describe('ProfanityFilterService', () => {
  let service: ProfanityFilterService;

  function createState(matrix: string[][]): WordSearchState {
    const state = new WordSearchState();
    const options = TestUtils.createOptions(matrix);
    options.filterAccidentalProfanity = true;
    state.setOptions(options);
    state.seedMatrix(matrix);

    return state;
  }

  beforeEach(() => {
    service = new ProfanityFilterService();
    service.setProfanityList(['leg']);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  describe('should remove accidental profanity without touching the user-provided words when the profanity is', () => {
    it('horizontal', () => {
      const matrix = [
        ['l', 'e', 'g'],
        ['m', 's', 'n'],
        ['x', 'k', 'l'],
      ];

      const state = createState(matrix);

      const userPlacedLetters = [
        { letter: 'e', row: 0, column: 1 },
        { letter: 's', row: 1, column: 1 },
        { letter: 'k', row: 2, column: 1 },
      ];

      const result = service.filterProfanity(state, userPlacedLetters);

      expect(state.getValueAt(0, 0)).toBe(LetterPlaceholder.value);
      expect(state.getValueAt(0, 1)).toBe('e');
      expect(state.getValueAt(0, 2)).toBe(LetterPlaceholder.value);
      expect(result).toBeTruthy();
    });

    it('horizontal and backwards', () => {
      const matrix = [
        ['g', 'e', 'l'],
        ['m', 's', 'n'],
        ['x', 'k', 'l'],
      ];

      const state = createState(matrix);

      const userPlacedLetters = [
        { letter: 'e', row: 0, column: 1 },
        { letter: 's', row: 1, column: 1 },
        { letter: 'k', row: 2, column: 1 },
      ];

      const result = service.filterProfanity(state, userPlacedLetters);

      expect(state.getValueAt(0, 0)).toBe(LetterPlaceholder.value);
      expect(state.getValueAt(0, 1)).toBe('e');
      expect(state.getValueAt(0, 2)).toBe(LetterPlaceholder.value);
      expect(result).toBeTruthy();
    });

    it('vertical', () => {
      const matrix = [
        ['l', 'e', 't'],
        ['e', 's', 'n'],
        ['g', 'k', 'l'],
      ];

      const state = createState(matrix);

      const userPlacedLetters = [
        { letter: 'a', row: 1, column: 0 },
        { letter: 's', row: 1, column: 1 },
        { letter: 'k', row: 1, column: 2 },
      ];

      const result = service.filterProfanity(state, userPlacedLetters);

      expect(state.getValueAt(0, 0)).toBe(LetterPlaceholder.value);
      expect(state.getValueAt(1, 0)).toBe('e');
      expect(state.getValueAt(2, 0)).toBe(LetterPlaceholder.value);
      expect(result).toBeTruthy();
    });

    it('vertical and backwards', () => {
      const matrix = [
        ['g', 'e', 't'],
        ['e', 's', 'k'],
        ['l', 'k', 'l'],
      ];

      const state = createState(matrix);

      const userPlacedLetters = [
        { letter: 'a', row: 1, column: 0 },
        { letter: 's', row: 1, column: 1 },
        { letter: 'k', row: 1, column: 2 },
      ];

      const result = service.filterProfanity(state, userPlacedLetters);

      expect(state.getValueAt(0, 0)).toBe(LetterPlaceholder.value);
      expect(state.getValueAt(1, 0)).toBe('e');
      expect(state.getValueAt(2, 0)).toBe(LetterPlaceholder.value);
      expect(result).toBeTruthy();
    });

    it('diagonal from top to bottom', () => {
      const matrix = [
        ['l', 'e', 't'],
        ['s', 'e', 'n'],
        ['f', 'k', 'g'],
      ];

      const state = createState(matrix);

      const userPlacedLetters = [
        { letter: 's', row: 1, column: 0 },
        { letter: 'e', row: 1, column: 1 },
        { letter: 'n', row: 1, column: 2 },
      ];

      const result = service.filterProfanity(state, userPlacedLetters);

      expect(state.getValueAt(0, 0)).toBe(LetterPlaceholder.value);
      expect(state.getValueAt(1, 1)).toBe('e');
      expect(state.getValueAt(2, 2)).toBe(LetterPlaceholder.value);
      expect(result).toBeTruthy();
    });

    it('diagonal from top to bottom and backwards', () => {
      const matrix = [
        ['g', 'e', 't'],
        ['s', 'e', 'n'],
        ['f', 'k', 'l'],
      ];

      const state = createState(matrix);

      const userPlacedLetters = [
        { letter: 's', row: 1, column: 0 },
        { letter: 'a', row: 1, column: 1 },
        { letter: 'n', row: 1, column: 2 },
      ];

      const result = service.filterProfanity(state, userPlacedLetters);

      expect(state.getValueAt(0, 0)).toBe(LetterPlaceholder.value);
      expect(state.getValueAt(1, 1)).toBe('e');
      expect(state.getValueAt(2, 2)).toBe(LetterPlaceholder.value);
      expect(result).toBeTruthy();
    });

    it('diagonal from bottom to top', () => {
      const matrix = [
        ['s', 'e', 'g'],
        ['s', 'e', 'n'],
        ['l', 'k', 'g'],
      ];

      const state = createState(matrix);

      const userPlacedLetters = [
        { letter: 's', row: 1, column: 0 },
        { letter: 'a', row: 1, column: 1 },
        { letter: 'n', row: 1, column: 2 },
      ];

      const result = service.filterProfanity(state, userPlacedLetters);

      expect(state.getValueAt(2, 0)).toBe(LetterPlaceholder.value);
      expect(state.getValueAt(1, 1)).toBe('e');
      expect(state.getValueAt(0, 2)).toBe(LetterPlaceholder.value);
      expect(result).toBeTruthy();
    });

    it('diagonal from bottom to top and backwards', () => {
      const matrix = [
        ['s', 'e', 'l'],
        ['s', 'e', 'n'],
        ['g', 'k', 'g'],
      ];

      const state = createState(matrix);

      const userPlacedLetters = [
        { letter: 's', row: 1, column: 0 },
        { letter: 'a', row: 1, column: 1 },
        { letter: 'n', row: 1, column: 2 },
      ];

      const result = service.filterProfanity(state, userPlacedLetters);

      expect(state.getValueAt(2, 0)).toBe(LetterPlaceholder.value);
      expect(state.getValueAt(1, 1)).toBe('e');
      expect(state.getValueAt(0, 2)).toBe(LetterPlaceholder.value);
      expect(result).toBeTruthy();
    });
  });

  describe('should not remove intentional profanity when the profanity is', () => {
    it('horizontal', () => {
      const matrix = [
        ['l', 'e', 'g'],
        ['m', 's', 'n'],
        ['x', 'k', 'l'],
      ];

      const state = createState(matrix);

      const userPlacedLetters = [
        { letter: 'l', row: 0, column: 0 },
        { letter: 'e', row: 0, column: 1 },
        { letter: 'g', row: 0, column: 2 },
      ];

      const result = service.filterProfanity(state, userPlacedLetters);

      expect(state.getValueAt(0, 0)).toBe('l');
      expect(state.getValueAt(0, 1)).toBe('e');
      expect(state.getValueAt(0, 2)).toBe('g');
      expect(result).toBeFalsy();
    });
  });
});
