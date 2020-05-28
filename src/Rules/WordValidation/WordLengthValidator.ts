import { WordValidator } from './WordValidator';
import { WordSearchState } from '../WordSearchState/WordSearchState';

export class WordLengthValidator implements WordValidator {
    getErrorKey() {
        return 'length';
    }

    getMessage(word: string) {
        return `${word} is longer than both the height and width!`;
    }

    validate(currentState: WordSearchState, word: string) {
        let tooWide = () => word.length > currentState.columns;
        let tooTall = () => word.length > currentState.rows;

        if (tooWide() && tooTall()) {
            return false;
        }

        return true;
    }
}
