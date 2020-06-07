import { WordPlacementStrategyBase } from './WordPlacementStrategyBase';
import { Injectable } from '@angular/core';
import { WordPlacementStrategy } from './WordPlacementStrategy';
import { WordPlacementStrategyModule } from './WordPlacementStrategyModule';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { WordPosition } from '../WordPosition/WordPosition';
import { HorizontalWordPositionService } from '../WordPosition/HorizontalWordPositionService';
import { RandomNumberGeneratorService } from '../RandomNumberGenerator/RandomNumberGeneratorService';
import { StringUtils } from '../StringUtils/StringUtils';

@Injectable({
    providedIn: WordPlacementStrategyModule
})
export class HorizontalWordPlacementStrategy extends WordPlacementStrategyBase implements WordPlacementStrategy {
    constructor(
        private horizontalWordPositionService: HorizontalWordPositionService,
        protected randomNumberGeneratorService: RandomNumberGeneratorService,
        protected stringUtils: StringUtils
    ) {
        super(randomNumberGeneratorService, stringUtils);
    }

    public getStartPosition(currentState: WordSearchState, word: string) {
        let validPositions = this.horizontalWordPositionService.getValidPositions(currentState, word);

        if (!validPositions.length) {
            return null;
        }

        return this.randomNumberGeneratorService.getRandomValueFrom(validPositions);
    }

    public getNextPosition(startPosition: WordPosition, index: number) {
        return this.horizontalWordPositionService.getNextPosition(startPosition, index);
    }
}
