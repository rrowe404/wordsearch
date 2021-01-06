import { WordSearchOutputStrategy } from '../../Rules/WordSearchOutput/WordSearchOutputStrategy';
import { ConsoleWordSearchOutputStrategy } from './ConsoleWordSearchOutputStrategy';
import { ImageWordSearchOutputStrategy } from './ImageWordSearchOutputStrategy';
import { PlayableWordSearchOutputStrategy } from './PlayableWordSearchOutputStrategy';

export class WordSearchOutputStrategyFactory {
    private consoleWordSearchOutputStrategy = new ConsoleWordSearchOutputStrategy();
    private imageWordSearchOutputStrategy = new ImageWordSearchOutputStrategy();
    private playableWordSearchOutputStrategy = new PlayableWordSearchOutputStrategy();

    public createOutputStrategy($name: string): WordSearchOutputStrategy {
        switch ($name) {
            case ConsoleWordSearchOutputStrategy.getValue():
                return this.consoleWordSearchOutputStrategy;

            case ImageWordSearchOutputStrategy.getValue():
                return this.imageWordSearchOutputStrategy;

            case PlayableWordSearchOutputStrategy.getValue():
                return this.playableWordSearchOutputStrategy;

            default:
                throw new Error('You werent supposed to be able to get here you know');
        }
    }
}
