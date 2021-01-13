import { TestUtils } from '../TestUtils/TestUtils';
import { WordSearchGenerationOptions } from '../WordSearchGenerationOptions/WordSearchGenerationOptions';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { LetterPlaceholder } from './LetterPlaceholder';
import { LetterPlaceholderFillService } from './LetterPlaceholderFillService';

describe('LetterPlaceholderFillService', () => {
    let service: LetterPlaceholderFillService;

    function createState(matrix: string[][], options?: WordSearchGenerationOptions): WordSearchState {
        let state = new WordSearchState();
        options = options || TestUtils.createOptions(matrix);
        state.setOptions(options);
        state.seedMatrix(matrix);

        return state;
    }

    function expectCompleteResult(result: WordSearchState) {
        result.iterate((letter, row, column) => {
            expect(typeof (letter)).toBe('string');
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
        let matrix = [
            ['a', 'b', 'c'],
            ['d', 'e', 'f'],
            ['g', LetterPlaceholder.value, 'i']
        ];

        let state = createState(matrix);

        let result = service.fill(state);

        expectCompleteResult(result);
    });

    it('should not modify the original', () => {
        let matrix = [
            ['a', 'b', 'c'],
            ['d', 'e', 'f'],
            ['g', LetterPlaceholder.value, 'i']
        ];

        let state = createState(matrix);

        let result = service.fill(state);

        expect(state).not.toBe(result);
    });

    it('should ensure no profanity remains in the final product if the option is selected', () => {
        let matrix = [
            [LetterPlaceholder.value, LetterPlaceholder.value, LetterPlaceholder.value],
            ['d', 'e', 'u'],
            ['g', 'f', 'y']
        ];

        // this spy ensures that
        // even if profanity is replaced with more profanity,
        // it still gets filtered in the end
        spyOn(service, 'getFillLetter').and
            .returnValues('a', 'r', 'm', 'a', 'r', 'm', 'l', 'e', 'g', 'g', 'e', 'l');

        let options = TestUtils.createOptions(matrix);
        options.filterAccidentalProfanity = true;

        let state = createState(matrix, options);

        let result = service.fill(state);
        let filteredResult = service.profanityFilterService.filterProfanity(result, []);

        expect(filteredResult).toBeFalsy();
        expectCompleteResult(result);
    });
});
