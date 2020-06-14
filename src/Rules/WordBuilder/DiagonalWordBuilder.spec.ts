import { TestBed, async } from '@angular/core/testing';
import { DiagonalWordBuilder } from './DiagonalWordBuilder';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { TestUtils } from '../TestUtils/TestUtils';
import { WordBuilderModule } from './WordBuilderModule';

describe('DiagonalWordBuilder', () => {
    let service: DiagonalWordBuilder;

    function createState(matrix: string[][]): WordSearchState {
        let state = new WordSearchState();
        let options = TestUtils.createOptions(matrix);
        state.setOptions(options);
        state.seedMatrix(matrix);

        return state;
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                WordBuilderModule
            ]
        });

        service = TestBed.inject(DiagonalWordBuilder);
    }));

    it('should create the service', () => {
        expect(service).toBeTruthy();
    });

    it('should correctly identify a top-down forwards word', () => {
        let matrix = [
            ['w', 'h', 't'],
            ['h', 'a', 'e'],
            ['c', 'e', 't']
        ];

        let state = createState(matrix);
        let start = { letter: 'w', row: 0, column: 0 };
        let end = { letter: 't', row: 2, column: 2 };

        let result = service.build(state, start, end);

        expect(result).toBe('wat');
    });

    it('should correctly identify a top-down backwards word', () => {
        let matrix = [
            ['t', 'h', 't'],
            ['h', 'a', 'e'],
            ['c', 'e', 'w']
        ];

        let state = createState(matrix);
        let start = { letter: 'w', row: 2, column: 2 };
        let end = { letter: 't', row: 0, column: 0 };

        let result = service.build(state, start, end);

        expect(result).toBe('wat');
    });

    it('should correctly identify a bottom-up forwards word', () => {
        let matrix = [
            ['t', 'e', 't'],
            ['h', 'a', 'e'],
            ['w', 'h', 'c']
        ];

        let state = createState(matrix);
        let start = { letter: 'w', row: 2, column: 0 };
        let end = { letter: 't', row: 0, column: 2 };

        let result = service.build(state, start, end);

        expect(result).toBe('wat');
    });

    it('should correctly identify a bottom-up backwards word', () => {
        let matrix = [
            ['t', 'e', 'w'],
            ['h', 'a', 'e'],
            ['t', 'h', 'c']
        ];

        let state = createState(matrix);
        let start = { letter: 'w', row: 0, column: 2 };
        let end = { letter: 't', row: 2, column: 0 };

        let result = service.build(state, start, end);

        expect(result).toBe('wat');
    });
});
