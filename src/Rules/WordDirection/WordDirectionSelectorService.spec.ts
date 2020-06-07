import { TestBed, async } from '@angular/core/testing';
import { WordDirectionModule } from './WordDirectionModule';
import { WordDirectionSelectorService } from './WordDirectionSelectorService';

describe('WordDirectionSelectorService', () => {
    let service: WordDirectionSelectorService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                WordDirectionModule
            ]
        });

        service = TestBed.inject(WordDirectionSelectorService);
    }));

    it('should create the service', () => {
        expect(service).toBeTruthy();
    });
});
