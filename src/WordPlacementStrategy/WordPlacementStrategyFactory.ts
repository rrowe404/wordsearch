import { WordDirection } from 'src/WordDirection/WordDirection';
import { Injectable } from '@angular/core';
import { HorizontalWordPlacementStrategy } from './HorizontalWordPlacementStrategy';
import { VerticalWordPlacementStrategy } from './VerticalWordPlacementStrategy';

@Injectable({
    providedIn: 'root'
})
export class WordPlacementStrategyFactory {
    constructor(
        private horizontalWordPlacementStrategy: HorizontalWordPlacementStrategy,
        private verticalWordPlacementStrategy: VerticalWordPlacementStrategy
    ) {
    }

    public createStrategy(direction: WordDirection) {
        switch(direction) {
            case WordDirection.Horizontal:
                return this.horizontalWordPlacementStrategy;

            case WordDirection.Vertical:
                return this.verticalWordPlacementStrategy;

            default:
                throw new Error('Not Implemented!');
        }

    }
}