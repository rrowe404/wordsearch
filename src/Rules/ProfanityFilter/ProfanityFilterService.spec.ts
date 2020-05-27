import { TestBed, async } from '@angular/core/testing';
import { ProfanityFilterService } from './ProfanityFilterService';
import { ProfanityFilterModule } from './ProfanityFilterModule';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { LetterPlaceholder } from '../LetterPlaceholder/LetterPlaceholder';

describe('ProfanityFilterService', () => {
    let service: ProfanityFilterService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                ProfanityFilterModule
            ]
        });

        service = TestBed.get(ProfanityFilterService);
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

            let state = new WordSearchState();
            state.setOptions({
                alphabetizeWordList: false,
                height: matrix.length,
                width: matrix[0].length,
                showWordList: false,
                title: '',
                words: []
            });
            state.seedMatrix(matrix);

            service.setProfanityList(['fag']);
            let userPlacedLetters = [
                { letter: 'a', row: 0, column: 1 },
                { letter: 's', row: 1, column: 1 },
                { letter: 'd', row: 2, column: 1 }
            ];

            let result = service.filterProfanity(state, userPlacedLetters);

            expect(state.getValueAt(0, 0)).toBe(LetterPlaceholder.value);
            expect(state.getValueAt(0, 1)).toBe('a');
            expect(state.getValueAt(0, 2)).toBe(LetterPlaceholder.value);;
            expect(result).toBeTrue();
        });
    });
});