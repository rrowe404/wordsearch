import { WordDirectionSelectorService } from './WordDirectionSelectorService';

describe('WordDirectionSelectorService', () => {
    let service: WordDirectionSelectorService;

    beforeEach(() => {
        service = new WordDirectionSelectorService();
    });

    it('should create the service', () => {
        expect(service).toBeTruthy();
    });
});
