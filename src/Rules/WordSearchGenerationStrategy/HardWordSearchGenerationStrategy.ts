import { WordSearchGenerationStrategyBase } from './WordSearchGenerationStrategyBase';
import { WordSearchGenerationStrategy } from './WordSearchGenerationStrategy';
import { Injectable } from '@angular/core';
import { WordSearchGenerationStrategyModule } from './WordSearchGenerationStrategyModule';

@Injectable({
    providedIn: WordSearchGenerationStrategyModule
})
export class HardWordSearchGenerationStrategy extends WordSearchGenerationStrategyBase implements WordSearchGenerationStrategy {
    protected allowOverlaps = true;
}