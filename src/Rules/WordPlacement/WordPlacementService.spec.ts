import { TestUtils } from '../TestUtils/TestUtils';
import { WordSearchStateFactory } from '../WordSearchState/WordSearchStateFactory';
import { WordPlacementService } from './WordPlacementService';

describe('WordPlacementService', () => {
    let service: WordPlacementService;

    beforeEach(() => {
        service = new WordPlacementService();
    });

    it('should exist', () => {
        expect(service).toBeTruthy();
    });

    it('should not modify the passed-in state', () => {
        let factory = new WordSearchStateFactory();
        let state = factory.createWordSearch(TestUtils.createOptions([[]]));

        let result = service.placeWords(state);

        expect(result).not.toBe(state);
    });
});
