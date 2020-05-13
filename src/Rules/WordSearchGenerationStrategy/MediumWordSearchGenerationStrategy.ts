import { WordSearchGenerationStrategyBase } from './WordSearchGenerationStrategyBase';
import { WordSearchGenerationStrategy } from './WordSearchGenerationStrategy';
import { WordDirection } from 'src/Rules/WordDirection/WordDirection';
import { Injectable } from '@angular/core';
import { WordSearchGenerationStrategyModule } from './WordSearchGenerationStrategyModule';

@Injectable({
    providedIn: WordSearchGenerationStrategyModule
})
export class MediumWordSearchGenerationStrategy extends WordSearchGenerationStrategyBase implements WordSearchGenerationStrategy {
    protected directions = [WordDirection.Horizontal, WordDirection.Vertical, WordDirection.Diagonal];
}