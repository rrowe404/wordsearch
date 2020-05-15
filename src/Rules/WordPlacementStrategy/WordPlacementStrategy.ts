import { WordSearchState } from '../WordSearchState/WordSearchState';

export interface WordPlacementStrategy {
    placeWord(currentState: WordSearchState, word: string);
}