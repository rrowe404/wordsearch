import { WordSearchState } from '../WordSearchState/WordSearchState';

export interface WordSearchGenerationStrategy {
    generate(currentState: WordSearchState): WordSearchState;
}