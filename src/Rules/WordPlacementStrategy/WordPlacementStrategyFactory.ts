import { WordDirection } from 'src/Rules/WordDirection/WordDirection';
import { HorizontalWordPlacementStrategy } from './HorizontalWordPlacementStrategy';
import { VerticalWordPlacementStrategy } from './VerticalWordPlacementStrategy';
import { DiagonalWordPlacementStrategy } from './DiagonalWordPlacementStrategy';
import { Injectable } from '@angular/core';
import { WordPlacementStrategyModule } from './WordPlacementStrategyModule';

@Injectable({
    providedIn: WordPlacementStrategyModule
})
export class WordPlacementStrategyFactory {
    constructor(
        private horizontalWordPlacementStrategy: HorizontalWordPlacementStrategy,
        private verticalWordPlacementStrategy: VerticalWordPlacementStrategy,
        private diagonalWordPlacementStrategy: DiagonalWordPlacementStrategy
    ) {
    }

    public createStrategy(direction: WordDirection) {
        switch (direction) {
            case WordDirection.Horizontal:
                return this.horizontalWordPlacementStrategy;

            case WordDirection.Vertical:
                return this.verticalWordPlacementStrategy;

            case WordDirection.Diagonal:
                return this.diagonalWordPlacementStrategy;

            default:
                throw new Error('Not Implemented!');
        }

    }
}
