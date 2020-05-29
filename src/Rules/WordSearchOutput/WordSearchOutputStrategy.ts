import { WordSearchState } from '../WordSearchState/WordSearchState';

export interface WordSearchOutputStrategy {
    output(currentState: WordSearchState);
}