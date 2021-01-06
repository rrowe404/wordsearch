import { HorizontalWordBuilder } from './HorizontalWordBuilder';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { TestUtils } from '../TestUtils/TestUtils';

describe('HorizontalWordBuilder', () => {
    let service: HorizontalWordBuilder;

    function createState(matrix: string[][]): WordSearchState {
        let state = new WordSearchState();
        let options = TestUtils.createOptions(matrix);
        state.setOptions(options);
        state.seedMatrix(matrix);

        return state;
    }

    beforeEach(() => {
        service = new HorizontalWordBuilder();
    });

    it('should create the service', () => {
        expect(service).toBeTruthy();
    });

    it('should correctly identify a forwards word', () => {
        let matrix = [
            ['w', 'a', 't'],
            ['t', 'h', 'e'],
            ['h', 'e', 'c']
        ];

        let state = createState(matrix);
        let start = { letter: 'w', row: 0, column: 0 };
        let end = { letter: 't', row: 0, column: 2 };

        let result = service.build(state, start, end);

        let expectedLettersWithPositions = [
            start,
            { letter: 'a', row: 0, column: 1 },
            end
        ];

        expect(result.word).toBe('wat');
        TestUtils.testArrayEquivalency(result.lettersWithPositions, expectedLettersWithPositions);
    });

    it('should correctly identify a backwards word',  () => {
        let matrix = [
            ['t', 'a', 'w'],
            ['t', 'h', 'e'],
            ['h', 'e', 'c']
        ];

        let state = createState(matrix);
        let start = { letter: 'w', row: 0, column: 2 };
        let end = { letter: 't', row: 0, column: 0 };

        let result = service.build(state, start, end);

        let expectedLettersWithPositions = [
            end,
            { letter: 'a', row: 0, column: 1 },
            start
        ];

        expect(result.word).toBe('wat');
        TestUtils.testArrayEquivalency(result.lettersWithPositions, expectedLettersWithPositions);
    });
});
