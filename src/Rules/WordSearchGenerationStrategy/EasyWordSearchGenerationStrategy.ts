import { WordSearchGenerationStrategy } from './WordSearchGenerationStrategy';
import { WordDirection } from 'src/Rules/WordDirection/WordDirection';
import { Injectable } from '@angular/core';
import { WordSearchGenerationStrategyBase } from './WordSearchGenerationStrategyBase';
import { WordSearchGenerationStrategyModule } from './WordSearchGenerationStrategyModule';

/**
 * Forward words only, across and down only. No overlaps.
 */
@Injectable({
    providedIn: WordSearchGenerationStrategyModule
})
export class EasyWordSearchGenerationStrategy extends WordSearchGenerationStrategyBase implements WordSearchGenerationStrategy {
    protected directions = [WordDirection.Horizontal, WordDirection.Vertical];
}