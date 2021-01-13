import { ProfanityFilterService } from './ProfanityFilterService';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { LetterPlaceholder } from '../LetterPlaceholder/LetterPlaceholder';
import { TestUtils } from '../TestUtils/TestUtils';

describe('ProfanityFilterService', () => {
    let service: ProfanityFilterService;

    function createState(matrix: string[][]): WordSearchState {
        let state = new WordSearchState();
        let options = TestUtils.createOptions(matrix);
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
            let matrix = [
                ['l', 'e', 'g'],
                ['m', 's', 'n'],
                ['x', 'k', 'l']
            ];

            let state = createState(matrix);

            let userPlacedLetters = [
                { letter: 'e', row: 0, column: 1 },
                { letter: 's', row: 1, column: 1 },
                { letter: 'k', row: 2, column: 1 }
            ];

            let result = service.filterProfanity(state, userPlacedLetters);

            expect(state.getValueAt(0, 0)).toBe(LetterPlaceholder.value);
            expect(state.getValueAt(0, 1)).toBe('e');
            expect(state.getValueAt(0, 2)).toBe(LetterPlaceholder.value);
            expect(result).toBeTrue();
        });

        it('horizontal and backwards', () => {
            let matrix = [
                ['g', 'e', 'l'],
                ['m', 's', 'n'],
                ['x', 'k', 'l']
            ];

            let state = createState(matrix);

            let userPlacedLetters = [
                { letter: 'e', row: 0, column: 1 },
                { letter: 's', row: 1, column: 1 },
                { letter: 'k', row: 2, column: 1 }
            ];

            let result = service.filterProfanity(state, userPlacedLetters);

            expect(state.getValueAt(0, 0)).toBe(LetterPlaceholder.value);
            expect(state.getValueAt(0, 1)).toBe('e');
            expect(state.getValueAt(0, 2)).toBe(LetterPlaceholder.value);
            expect(result).toBeTrue();
        });

        it('vertical', () => {
            let matrix = [
                ['l', 'e', 't'],
                ['e', 's', 'n'],
                ['g', 'k', 'l']
            ];

            let state = createState(matrix);

            let userPlacedLetters = [
                { letter: 'a', row: 1, column: 0 },
                { letter: 's', row: 1, column: 1 },
                { letter: 'k', row: 1, column: 2 }
            ];

            let result = service.filterProfanity(state, userPlacedLetters);

            expect(state.getValueAt(0, 0)).toBe(LetterPlaceholder.value);
            expect(state.getValueAt(1, 0)).toBe('e');
            expect(state.getValueAt(2, 0)).toBe(LetterPlaceholder.value);
            expect(result).toBeTrue();
        });

        it('vertical and backwards', () => {
            let matrix = [
                ['g', 'e', 't'],
                ['e', 's', 'k'],
                ['l', 'k', 'l']
            ];

            let state = createState(matrix);

            let userPlacedLetters = [
                { letter: 'a', row: 1, column: 0 },
                { letter: 's', row: 1, column: 1 },
                { letter: 'k', row: 1, column: 2 }
            ];

            let result = service.filterProfanity(state, userPlacedLetters);

            expect(state.getValueAt(0, 0)).toBe(LetterPlaceholder.value);
            expect(state.getValueAt(1, 0)).toBe('e');
            expect(state.getValueAt(2, 0)).toBe(LetterPlaceholder.value);
            expect(result).toBeTrue();
        });

        it('diagonal from top to bottom', () => {
            let matrix = [
                ['l', 'e', 't'],
                ['s', 'e', 'n'],
                ['f', 'k', 'g']
            ];

            let state = createState(matrix);

            let userPlacedLetters = [
                { letter: 's', row: 1, column: 0 },
                { letter: 'e', row: 1, column: 1 },
                { letter: 'n', row: 1, column: 2 }
            ];

            let result = service.filterProfanity(state, userPlacedLetters);

            expect(state.getValueAt(0, 0)).toBe(LetterPlaceholder.value);
            expect(state.getValueAt(1, 1)).toBe('e');
            expect(state.getValueAt(2, 2)).toBe(LetterPlaceholder.value);
            expect(result).toBeTrue();
        });

        it('diagonal from top to bottom and backwards', () => {
            let matrix = [
                ['g', 'e', 't'],
                ['s', 'e', 'n'],
                ['f', 'k', 'l']
            ];

            let state = createState(matrix);

            let userPlacedLetters = [
                { letter: 's', row: 1, column: 0 },
                { letter: 'a', row: 1, column: 1 },
                { letter: 'n', row: 1, column: 2 }
            ];

            let result = service.filterProfanity(state, userPlacedLetters);

            expect(state.getValueAt(0, 0)).toBe(LetterPlaceholder.value);
            expect(state.getValueAt(1, 1)).toBe('e');
            expect(state.getValueAt(2, 2)).toBe(LetterPlaceholder.value);
            expect(result).toBeTrue();
        });

        it('diagonal from bottom to top', () => {
            let matrix = [
                ['s', 'e', 'g'],
                ['s', 'e', 'n'],
                ['l', 'k', 'g']
            ];

            let state = createState(matrix);

            let userPlacedLetters = [
                { letter: 's', row: 1, column: 0 },
                { letter: 'a', row: 1, column: 1 },
                { letter: 'n', row: 1, column: 2 }
            ];

            let result = service.filterProfanity(state, userPlacedLetters);

            expect(state.getValueAt(2, 0)).toBe(LetterPlaceholder.value);
            expect(state.getValueAt(1, 1)).toBe('e');
            expect(state.getValueAt(0, 2)).toBe(LetterPlaceholder.value);
            expect(result).toBeTrue();
        });

        it('diagonal from bottom to top and backwards', () => {
            let matrix = [
                ['s', 'e', 'l'],
                ['s', 'e', 'n'],
                ['g', 'k', 'g']
            ];

            let state = createState(matrix);

            let userPlacedLetters = [
                { letter: 's', row: 1, column: 0 },
                { letter: 'a', row: 1, column: 1 },
                { letter: 'n', row: 1, column: 2 }
            ];

            let result = service.filterProfanity(state, userPlacedLetters);

            expect(state.getValueAt(2, 0)).toBe(LetterPlaceholder.value);
            expect(state.getValueAt(1, 1)).toBe('e');
            expect(state.getValueAt(0, 2)).toBe(LetterPlaceholder.value);
            expect(result).toBeTrue();
        });
    });
});
