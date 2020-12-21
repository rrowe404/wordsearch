import { TestBed, async } from '@angular/core/testing';
import { WordDirectionSelectorService } from './WordDirectionSelectorService';

describe('WordDirectionSelectorService', () => {
    let service: WordDirectionSelectorService;

    beforeEach(async(() => {
        service = new WordDirectionSelectorService();
    }));

    it('should create the service', () => {
        expect(service).toBeTruthy();
    });
});
