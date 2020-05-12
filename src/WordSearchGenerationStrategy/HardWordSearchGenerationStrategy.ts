import { WordSearchGenerationStrategyBase } from './WordSearchGenerationStrategyBase';
import { WordSearchGenerationStrategy } from './WordSearchGenerationStrategy';
import { WordDirection } from 'src/WordDirection/WordDirection';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HardWordSearchGenerationStrategy extends WordSearchGenerationStrategyBase implements WordSearchGenerationStrategy {
    protected directions = [WordDirection.Horizontal, WordDirection.Vertical, WordDirection.Diagonal];
}