import { TestBed, async } from '@angular/core/testing';
import { ProfanityFilterService } from './ProfanityFilterService';
import { ProfanityFilterModule } from './ProfanityFilterModule';
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

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ProfanityFilterModule
            ]
        });

        service = TestBed.inject(ProfanityFilterService);
        service.setProfanityList(['fag']);
    }));

    it('should create the service', () => {
        expect(service).toBeTruthy();
    });

    describe('should remove accidental profanity without touching the user-provided words when the profanity is', () => {
        it('horizontal', () => {
            let matrix = [
                ['f', 'a', 'g'],
                ['m', 's', 'n'],
                ['x', 'k', 'l']
            ];

            let state = createState(matrix);

            let userPlacedLetters = [
                { letter: 'a', row: 0, column: 1 },
                { letter: 's', row: 1, column: 1 },
                { letter: 'k', row: 2, column: 1 }
            ];

            let result = service.filterProfanity(state, userPlacedLetters);

            expect(state.getValueAt(0, 0)).toBe(LetterPlaceholder.value);
            expect(state.getValueAt(0, 1)).toBe('a');
            expect(state.getValueAt(0, 2)).toBe(LetterPlaceholder.value);
            expect(result).toBeTrue();
        });

        it('horizontal and backwards', () => {
            let matrix = [
                ['g', 'a', 'f'],
                ['m', 's', 'n'],
                ['x', 'k', 'l']
            ];

            let state = createState(matrix);

            let userPlacedLetters = [
                { letter: 'a', row: 0, column: 1 },
                { letter: 's', row: 1, column: 1 },
                { letter: 'k', row: 2, column: 1 }
            ];

            let result = service.filterProfanity(state, userPlacedLetters);

            expect(state.getValueAt(0, 0)).toBe(LetterPlaceholder.value);
            expect(state.getValueAt(0, 1)).toBe('a');
            expect(state.getValueAt(0, 2)).toBe(LetterPlaceholder.value);
            expect(result).toBeTrue();
        });

        it('vertical', () => {
            let matrix = [
                ['f', 'e', 't'],
                ['a', 's', 'n'],
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
            expect(state.getValueAt(1, 0)).toBe('a');
            expect(state.getValueAt(2, 0)).toBe(LetterPlaceholder.value);
            expect(result).toBeTrue();
        });

        it('vertical and backwards', () => {
            let matrix = [
                ['g', 'e', 't'],
                ['a', 's', 'k'],
                ['f', 'k', 'l']
            ];

            let state = createState(matrix);

            let userPlacedLetters = [
                { letter: 'a', row: 1, column: 0 },
                { letter: 's', row: 1, column: 1 },
                { letter: 'k', row: 1, column: 2 }
            ];

            let result = service.filterProfanity(state, userPlacedLetters);

            expect(state.getValueAt(0, 0)).toBe(LetterPlaceholder.value);
            expect(state.getValueAt(1, 0)).toBe('a');
            expect(state.getValueAt(2, 0)).toBe(LetterPlaceholder.value);
            expect(result).toBeTrue();
        });

        it('diagonal from top to bottom', () => {
            let matrix = [
                ['f', 'e', 't'],
                ['s', 'a', 'n'],
                ['f', 'k', 'g']
            ];

            let state = createState(matrix);

            let userPlacedLetters = [
                { letter: 's', row: 1, column: 0 },
                { letter: 'a', row: 1, column: 1 },
                { letter: 'n', row: 1, column: 2 }
            ];

            let result = service.filterProfanity(state, userPlacedLetters);

            expect(state.getValueAt(0, 0)).toBe(LetterPlaceholder.value);
            expect(state.getValueAt(1, 1)).toBe('a');
            expect(state.getValueAt(2, 2)).toBe(LetterPlaceholder.value);
            expect(result).toBeTrue();
        });

        it('diagonal from top to bottom and backwards', () => {
            let matrix = [
                ['g', 'e', 't'],
                ['s', 'a', 'n'],
                ['f', 'k', 'f']
            ];

            let state = createState(matrix);

            let userPlacedLetters = [
                { letter: 's', row: 1, column: 0 },
                { letter: 'a', row: 1, column: 1 },
                { letter: 'n', row: 1, column: 2 }
            ];

            let result = service.filterProfanity(state, userPlacedLetters);

            expect(state.getValueAt(0, 0)).toBe(LetterPlaceholder.value);
            expect(state.getValueAt(1, 1)).toBe('a');
            expect(state.getValueAt(2, 2)).toBe(LetterPlaceholder.value);
            expect(result).toBeTrue();
        });

        it('diagonal from bottom to top', () => {
            let matrix = [
                ['s', 'e', 'g'],
                ['s', 'a', 'n'],
                ['f', 'k', 'g']
            ];

            let state = createState(matrix);

            let userPlacedLetters = [
                { letter: 's', row: 1, column: 0 },
                { letter: 'a', row: 1, column: 1 },
                { letter: 'n', row: 1, column: 2 }
            ];

            let result = service.filterProfanity(state, userPlacedLetters);

            expect(state.getValueAt(2, 0)).toBe(LetterPlaceholder.value);
            expect(state.getValueAt(1, 1)).toBe('a');
            expect(state.getValueAt(0, 2)).toBe(LetterPlaceholder.value);
            expect(result).toBeTrue();
        });

        it('diagonal from bottom to top and backwards', () => {
            let matrix = [
                ['s', 'e', 'f'],
                ['s', 'a', 'n'],
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
            expect(state.getValueAt(1, 1)).toBe('a');
            expect(state.getValueAt(0, 2)).toBe(LetterPlaceholder.value);
            expect(result).toBeTrue();
        });
    });
});
