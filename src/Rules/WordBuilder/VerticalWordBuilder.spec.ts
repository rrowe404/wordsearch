import { TestBed, async } from '@angular/core/testing';
import { VerticalWordBuilder } from './VerticalWordBuilder';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { TestUtils } from '../TestUtils/TestUtils';
import { WordBuilderModule } from './WordBuilderModule';

describe('VerticalWordBuilder', () => {
    let service: VerticalWordBuilder;

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

        service = TestBed.inject(VerticalWordBuilder);
    }));

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

        expect(result).toBe('wat');
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

        expect(result).toBe('wat');
    });
});
