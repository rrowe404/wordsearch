import { WordSearchGenerationStrategyBase } from './WordSearchGenerationStrategyBase';
import { WordSearchGenerationStrategy } from './WordSearchGenerationStrategy';
import { WordDirection } from 'src/WordDirection/WordDirection';
import { Injectable } from '@angular/core';
import { WordOrientation } from 'src/WordOrientation/WordOrientation';
import { WordSearchGenerationStrategyModule } from './WordSearchGenerationStrategyModule';

@Injectable({
    providedIn: WordSearchGenerationStrategyModule
})
export class HardWordSearchGenerationStrategy extends WordSearchGenerationStrategyBase implements WordSearchGenerationStrategy {
    protected directions = [WordDirection.Horizontal, WordDirection.Vertical, WordDirection.Diagonal];
    protected orientations = [WordOrientation.Forwards, WordOrientation.Backwards];
    protected allowOverlaps = true;
}