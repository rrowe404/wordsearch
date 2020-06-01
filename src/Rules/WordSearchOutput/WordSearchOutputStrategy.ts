import { WordSearchState } from '../WordSearchState/WordSearchState';

export interface WordSearchOutputStrategy {
    clean();
    output(currentState: WordSearchState);
}
