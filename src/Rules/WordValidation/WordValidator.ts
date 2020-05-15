import { WordSearchState } from '../WordSearchState/WordSearchState';

export interface WordValidator {
    getErrorKey(): string;
    getMessage(word: string): string;
    validate(currentState: WordSearchState, word: string);
}
