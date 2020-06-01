import { WordSearchOutputStrategy } from './WordSearchOutputStrategy';
import { WordSearchState } from '../WordSearchState/WordSearchState';

export abstract class WordSearchOutputStrategyBase implements WordSearchOutputStrategy {
    protected currentState: WordSearchState;

    public output(currentState: WordSearchState) {
        this.currentState = currentState;

        this.outputTitle();
        this.outputPuzzle();
        this.outputWordList();
        this.outputTotal();
    }

    protected abstract outputTitle();
    protected abstract outputPuzzle();
    protected abstract outputTotal();
    protected abstract outputWordList();
}
