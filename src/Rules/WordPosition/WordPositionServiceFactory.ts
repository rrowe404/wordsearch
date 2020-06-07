import { WordDirection } from 'src/Rules/WordDirection/WordDirection';
import { HorizontalWordPositionService } from './HorizontalWordPositionService';
import { VerticalWordPositionService } from './VerticalWordPositionService';
import { BottomUpDiagonalWordPositionService } from './BottomUpDiagonalWordPositionService';
import { TopDownDiagonalWordPositionService } from './TopDownDiagonalWordPositionService';
import { Injectable } from '@angular/core';
import { WordPositionModule } from './WordPositionModule';
import { RandomNumberGeneratorService } from '../RandomNumberGenerator/RandomNumberGeneratorService';
import { WordPositionServiceBase } from './WordPositionServiceBase';

@Injectable({
    providedIn: WordPositionModule
})
export class WordPositionServiceFactory {
    constructor(
        private horizontalWordPositionService: HorizontalWordPositionService,
        private verticalWordPositionService: VerticalWordPositionService,
        private bottomUpDiagonalWordPositionService: BottomUpDiagonalWordPositionService,
        private topDownDiagonalWordPositionService: TopDownDiagonalWordPositionService,
        private randomNumberGeneratorService: RandomNumberGeneratorService
    ) {
    }

    public getService(direction: WordDirection): WordPositionServiceBase {
        switch (direction) {
            case WordDirection.Horizontal:
                return this.horizontalWordPositionService;

            case WordDirection.Vertical:
                return this.verticalWordPositionService;

            case WordDirection.Diagonal:
                return this.randomNumberGeneratorService.flipACoin() ?
                       this.bottomUpDiagonalWordPositionService :
                       this.topDownDiagonalWordPositionService;

            default:
                throw new Error('Not Implemented!');
        }

    }
}
