import { WordSearchState } from '../WordSearchState/WordSearchState';

/** Before using a direction, we have to validate that the word can fit in that direction. */
export interface WordDirectionChecker {
    checkDirection(currentState: WordSearchState, word: string);
}