import { Injectable } from '@angular/core';
import { WordPlacementStrategy } from './WordPlacementStrategy';
import { WordPlacementStrategyBase } from './WordPlacementStrategyBase';
import { WordPlacementStrategyModule } from './WordPlacementStrategyModule';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { WordPosition } from '../WordPosition/WordPosition';
import { VerticalWordPositionService } from '../WordPosition/VerticalWordPositionService';
import { RandomNumberGeneratorService } from '../RandomNumberGenerator/RandomNumberGeneratorService';
import { StringUtils } from '../StringUtils/StringUtils';

@Injectable({
    providedIn: WordPlacementStrategyModule
})
export class VerticalWordPlacementStrategy extends WordPlacementStrategyBase implements WordPlacementStrategy {
    constructor(
        private verticalWordPositionService: VerticalWordPositionService,
        protected randomNumberGeneratorService: RandomNumberGeneratorService,
        protected stringUtils: StringUtils
    ) {
        super(randomNumberGeneratorService, stringUtils);
    }

    public getStartPosition(currentState: WordSearchState, word: string) {
        let validPositions = this.verticalWordPositionService.getValidPositions(currentState, word);

        if (!validPositions.length) {
            return null;
        }

        return this.randomNumberGeneratorService.getRandomValueFrom(validPositions);
    }

    public getNextPosition(startPosition: WordPosition, index: number) {
        return this.verticalWordPositionService.getNextPosition(startPosition, index);
    }
}
