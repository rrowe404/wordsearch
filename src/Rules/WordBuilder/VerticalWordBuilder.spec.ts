import { VerticalWordBuilder } from './VerticalWordBuilder';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { TestUtils } from '../TestUtils/TestUtils';

describe('VerticalWordBuilder', () => {
    let service: VerticalWordBuilder;

    function createState(matrix: string[][]): WordSearchState {
        let state = new WordSearchState();
        let options = TestUtils.createOptions(matrix);
        state.setOptions(options);
        state.seedMatrix(matrix);

        return state;
    }

    beforeEach(() => {
        service = new VerticalWordBuilder();
    });

    it('should create the service', () => {
        expect(service).toBeTruthy();
    });

    it('should correctly identify a forwards word', () => {
        let matrix = [
            ['w', 't', 'h'],
            ['a', 'h', 'e'],
            ['t', 'e', 'c']
        ];

        let state = createState(matrix);
        let start = { letter: 'w', row: 0, column: 0 };
        let end = { letter: 't', row: 2, column: 0 };

        let result = service.build(state, start, end);

        let expectedLettersWithPositions = [
            start,
            { letter: 'a', row: 1, column: 0 },
            end
        ];

        expect(result.word).toBe('wat');
        TestUtils.testArrayEquivalency(result.lettersWithPositions, expectedLettersWithPositions);
    });

    it('should correctly identify a backwards word',  () => {
        let matrix = [
            ['t', 't', 'h'],
            ['a', 'h', 'e'],
            ['w', 'e', 'c']
        ];

        let state = createState(matrix);
        let start = { letter: 'w', row: 2, column: 0 };
        let end = { letter: 't', row: 0, column: 0 };

        let result = service.build(state, start, end);

        let expectedLettersWithPositions = [
            end,
            { letter: 'a', row: 1, column: 0 },
            start
        ];

        expect(result.word).toBe('wat');
        TestUtils.testArrayEquivalency(result.lettersWithPositions, expectedLettersWithPositions);
    });
});
