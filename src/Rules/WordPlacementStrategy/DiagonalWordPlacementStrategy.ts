import { Injectable } from '@angular/core';
import { WordPlacementStrategyBase } from './WordPlacementStrategyBase';
import { WordPlacementStrategy } from './WordPlacementStrategy';
import { WordPlacementStrategyModule } from './WordPlacementStrategyModule';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { WordPosition } from '../WordPosition/WordPosition';
import { TopDownDiagonalWordPositionService } from '../WordPosition/TopDownDiagonalWordPositionService';
import { RandomNumberGeneratorService } from '../RandomNumberGenerator/RandomNumberGeneratorService';
import { StringUtils } from '../StringUtils/StringUtils';
import { BottomUpDiagonalWordPositionService } from '../WordPosition/BottomUpDiagonalWordPositionService';

@Injectable({
    providedIn: WordPlacementStrategyModule
})
export class DiagonalWordPlacementStrategy extends WordPlacementStrategyBase implements WordPlacementStrategy {
    constructor(
        private bottomUpDiagonalWordPositionService: BottomUpDiagonalWordPositionService,
        private topDownDiagonalWordPositionService: TopDownDiagonalWordPositionService,
        protected randomNumberGeneratorService: RandomNumberGeneratorService,
        protected stringUtils: StringUtils
    ) {
        super(randomNumberGeneratorService, stringUtils);
    }

    /** If true, place the word from bottom to top. Otherwise, place it from top to bottom. */
    private bottomsUp: boolean;

    public getStartPosition(currentState: WordSearchState, word: string) {
        let validPositions = this.bottomsUp ?
                             this.bottomUpDiagonalWordPositionService.getValidPositions(currentState, word) :
                             this.topDownDiagonalWordPositionService.getValidPositions(currentState, word);

        if (!validPositions.length) {
            return null;
        }

        return this.randomNumberGeneratorService.getRandomValueFrom(validPositions);
    }

    public getNextPosition(startPosition: WordPosition, index: number) {
        return this.bottomsUp ?
               this.bottomUpDiagonalWordPositionService.getNextPosition(startPosition, index) :
               this.topDownDiagonalWordPositionService.getNextPosition(startPosition, index);
    }

    // a diagonally placed word spans both columns and rows
    public placeWord(currentState: WordSearchState, word: string) {
        this.bottomsUp = this.randomNumberGeneratorService.flipACoin();
        return super.placeWord(currentState, word);
    }
}
