import { Injectable } from '@angular/core';
import { WordSearchOutputModule } from './WordSearchOutputModule';
import { WordSearchOutputStrategy } from './WordSearchOutputStrategy';
import { ConsoleWordSearchOutputStrategy } from './ConsoleWordSearchOutputStrategy';

@Injectable({
    providedIn: WordSearchOutputModule
})
export class WordSearchOutputStrategyFactory {
    constructor(
        private consoleWordSearchOutputStrategy: ConsoleWordSearchOutputStrategy
    ) {
    }

    public createOutputStrategy($name: string): WordSearchOutputStrategy {
        switch ($name) {
            case ConsoleWordSearchOutputStrategy.getValue():
                return this.consoleWordSearchOutputStrategy;

            default:
                throw new Error('You werent supposed to be able to get here you know');
                
        }
    }
}