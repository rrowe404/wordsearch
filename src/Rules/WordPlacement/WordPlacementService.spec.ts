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
    const factory = new WordSearchStateFactory();
    const state = factory.createWordSearch(TestUtils.createOptions([[]]));

    const result = service.placeWords(state);

    expect(result).not.toBe(state);
  });
});
