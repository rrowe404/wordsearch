import { VerticalWordPositionService } from './VerticalWordPositionService';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { TestUtils } from '../TestUtils/TestUtils';
import { LetterPlaceholder } from '../LetterPlaceholder/LetterPlaceholder';
import { WordPosition } from './WordPosition';

describe('VerticalWordPositionService', () => {
    let service: VerticalWordPositionService;

    function createState(matrix: string[][]): WordSearchState {
        let state = new WordSearchState();
        let options = TestUtils.createOptions(matrix);
        state.setOptions(options);
        state.seedMatrix(matrix);

        return state;
    }

    beforeEach(() => {
        service = new VerticalWordPositionService();
    });

    it('should create the service', () => {
        expect(service).toBeTruthy();
    });

    it('should return valid data for a blank matrix', () => {
        let n = LetterPlaceholder.value;

        let matrix = [
            [n, n, n],
            [n, n, n],
            [n, n, n]
        ];

        let state = createState(matrix);

        let word = 'pig';

        let result = service.getValidStartPositions(state, word);

        let expected: WordPosition[] = [
            { row: 0, column: 0 },
            { row: 0, column: 1 },
            { row: 0, column: 2 }
        ];

        TestUtils.testArrayEquivalency(result, expected);
    });

    it('should return valid data for a matrix with overlaps', () => {
        let n = LetterPlaceholder.value;

        let matrix = [
            [n,  n,  n],
            [n, 'i', n],
            [n,  n,  n]
        ];

        let state = createState(matrix);

        let word = 'pig';

        let result = service.getValidStartPositions(state, word);

        let expected: WordPosition[] = [
            { row: 0, column: 0 },
            { row: 0, column: 1, hasOverlaps: true },
            { row: 0, column: 2 }
        ];

        TestUtils.testArrayEquivalency(result, expected);
    });
});
