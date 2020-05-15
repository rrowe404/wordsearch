import { WordSearchState } from '../WordSearchState/WordSearchState';

export interface WordValidator {
    getMessage(word: string): string;
    validate(currentState: WordSearchState, word: string);
}
