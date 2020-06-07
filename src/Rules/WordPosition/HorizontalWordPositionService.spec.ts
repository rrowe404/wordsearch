import { TestBed, async } from '@angular/core/testing';
import { WordPositionModule } from './WordPositionModule';
import { HorizontalWordPositionService } from './HorizontalWordPositionService';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { TestUtils } from '../TestUtils/TestUtils';
import { LetterPlaceholder } from '../LetterPlaceholder/LetterPlaceholder';
import { WordPosition } from './WordPosition';

describe('WordDirectionSelectorService', () => {
    let service: HorizontalWordPositionService;

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
                WordPositionModule
            ]
        });

        service = TestBed.inject(HorizontalWordPositionService);
    }));

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

        let result = service.getValidPositions(state, word);

        let expected: WordPosition[] = [
            { column: 0, row: 0 },
            { column: 0, row: 1 },
            { column: 0, row: 2 }
        ];

        expected.forEach((x, i) => {
            expect(x).toEqual(result[i]);
        });
    });
});
