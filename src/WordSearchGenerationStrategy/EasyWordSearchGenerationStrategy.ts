import { WordSearchGenerationStrategy } from './WordSearchGenerationStrategy';
import { WordDirection } from 'src/WordDirection/WordDirection';
import { Injectable } from '@angular/core';
import { WordSearchGenerationStrategyBase } from './WordSearchGenerationStrategyBase';

/**
 * Forward words only, across and down only. No overlaps.
 */
@Injectable({
    providedIn: 'root'
})
export class EasyWordSearchGenerationStrategy extends WordSearchGenerationStrategyBase implements WordSearchGenerationStrategy {
    protected directions = [WordDirection.Horizontal, WordDirection.Vertical];
}