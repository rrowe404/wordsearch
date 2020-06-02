import { Injectable } from '@angular/core';
import { WordSearchOutputModule } from './WordSearchOutputModule';
import { WordSearchOutputStrategy } from '../../Rules/WordSearchOutput/WordSearchOutputStrategy';
import { ConsoleWordSearchOutputStrategy } from './ConsoleWordSearchOutputStrategy';
import { ImageWordSearchOutputStrategy } from './ImageWordSearchOutputStrategy';

@Injectable({
    providedIn: WordSearchOutputModule
})
export class WordSearchOutputStrategyFactory {
    constructor(
        private consoleWordSearchOutputStrategy: ConsoleWordSearchOutputStrategy,
        private imageWordSearchOutputStrategy: ImageWordSearchOutputStrategy
    ) {
    }

    public createOutputStrategy($name: string): WordSearchOutputStrategy {
        switch ($name) {
            case ConsoleWordSearchOutputStrategy.getValue():
                return this.consoleWordSearchOutputStrategy;

            case ImageWordSearchOutputStrategy.getValue():
                return this.imageWordSearchOutputStrategy;

            default:
                throw new Error('You werent supposed to be able to get here you know');
        }
    }
}
