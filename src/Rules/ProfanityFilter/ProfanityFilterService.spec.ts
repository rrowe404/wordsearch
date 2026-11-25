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
    it('horizontal when the profanity starts after index zero', () => {
      const matrix = [
        ['x', 'l', 'e', 'g', 'x'],
        ['m', 's', 'n', 'q', 'r'],
        ['x', 'k', 'l', 'p', 't'],
      ];

      const state = createState(matrix);

      const result = service.filterProfanity(state, []);

      expect(state.getValueAt(0, 0)).toBe('x');
      expect(state.getValueAt(0, 1)).toBe(LetterPlaceholder.value);
      expect(state.getValueAt(0, 2)).toBe(LetterPlaceholder.value);
      expect(state.getValueAt(0, 3)).toBe(LetterPlaceholder.value);
      expect(state.getValueAt(0, 4)).toBe('x');
      expect(result).toBeTruthy();
    });

    it('vertical when the profanity starts after index zero', () => {
      const matrix = [
        ['x', 'x', 'x'],
        ['q', 'x', 'x'],
        ['l', 'x', 'x'],
        ['e', 'x', 'x'],
        ['g', 'x', 'x'],
      ];

      const state = createState(matrix);

      const result = service.filterProfanity(state, []);

      expect(state.getValueAt(0, 0)).toBe('x');
      expect(state.getValueAt(1, 0)).toBe('q');
      expect(state.getValueAt(2, 0)).toBe(LetterPlaceholder.value);
      expect(state.getValueAt(3, 0)).toBe(LetterPlaceholder.value);
      expect(state.getValueAt(4, 0)).toBe(LetterPlaceholder.value);
      expect(result).toBeTruthy();
    });

    it('vertical and backwards when the profanity starts after index zero', () => {
      const matrix = [
        ['g', 'x', 'x'],
        ['e', 'x', 'x'],
        ['l', 'x', 'x'],
        ['q', 'x', 'x'],
        ['x', 'x', 'x'],
      ];

      const state = createState(matrix);

      const result = service.filterProfanity(state, []);

      expect(state.getValueAt(0, 0)).toBe(LetterPlaceholder.value);
      expect(state.getValueAt(1, 0)).toBe(LetterPlaceholder.value);
      expect(state.getValueAt(2, 0)).toBe(LetterPlaceholder.value);
      expect(state.getValueAt(3, 0)).toBe('q');
      expect(state.getValueAt(4, 0)).toBe('x');
      expect(result).toBeTruthy();
    });

    it('top-left to bottom-right diagonal when the profanity starts after index zero', () => {
      const matrix = [
        ['x', 'x', 'x', 'x', 'x'],
        ['x', 'l', 'x', 'x', 'x'],
        ['x', 'x', 'e', 'x', 'x'],
        ['x', 'x', 'x', 'g', 'x'],
        ['x', 'x', 'x', 'x', 'x'],
      ];

      const state = createState(matrix);

      const result = service.filterProfanity(state, []);

      expect(state.getValueAt(1, 1)).toBe(LetterPlaceholder.value);
      expect(state.getValueAt(2, 2)).toBe(LetterPlaceholder.value);
      expect(state.getValueAt(3, 3)).toBe(LetterPlaceholder.value);
      expect(state.getValueAt(4, 4)).toBe('x');
      expect(result).toBeTruthy();
    });

    it('bottom-left to top-right diagonal when the profanity starts after index zero', () => {
      const matrix = [
        ['x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'l', 'x', 'x'],
        ['x', 'e', 'x', 'x', 'x'],
        ['g', 'x', 'x', 'x', 'x'],
      ];

      const state = createState(matrix);

      const result = service.filterProfanity(state, []);

      expect(state.getValueAt(2, 2)).toBe(LetterPlaceholder.value);
      expect(state.getValueAt(3, 1)).toBe(LetterPlaceholder.value);
      expect(state.getValueAt(4, 0)).toBe(LetterPlaceholder.value);
      expect(state.getValueAt(0, 4)).toBe('x');
      expect(result).toBeTruthy();
    });

    it('top-left to bottom-right diagonal and backwards when the profanity starts after index zero', () => {
      const matrix = [
        ['x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'g', 'x', 'x'],
        ['x', 'x', 'x', 'e', 'x'],
        ['x', 'x', 'x', 'x', 'l'],
      ];

      const state = createState(matrix);

      const result = service.filterProfanity(state, []);

      expect(state.getValueAt(2, 2)).toBe(LetterPlaceholder.value);
      expect(state.getValueAt(3, 3)).toBe(LetterPlaceholder.value);
      expect(state.getValueAt(4, 4)).toBe(LetterPlaceholder.value);
      expect(state.getValueAt(0, 0)).toBe('x');
      expect(state.getValueAt(1, 1)).toBe('x');
      expect(result).toBeTruthy();
    });

    it('bottom-left to top-right diagonal and backwards when the profanity starts after index zero', () => {
      const matrix = [
        ['x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x'],
        ['g', 'x', 'x', 'x', 'x'],
        ['x', 'e', 'x', 'x', 'x'],
        ['x', 'x', 'l', 'x', 'x'],
      ];

      const state = createState(matrix);

      const result = service.filterProfanity(state, []);

      expect(state.getValueAt(2, 0)).toBe(LetterPlaceholder.value);
      expect(state.getValueAt(3, 1)).toBe(LetterPlaceholder.value);
      expect(state.getValueAt(4, 2)).toBe(LetterPlaceholder.value);
      expect(state.getValueAt(0, 0)).toBe('x');
      expect(result).toBeTruthy();
    });

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
