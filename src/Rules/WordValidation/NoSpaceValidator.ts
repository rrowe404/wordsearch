import { WordValidator } from './WordValidator';
import { WordSearchState } from '../WordSearchState/WordSearchState';

export class NoSpaceValidator implements WordValidator {
    getErrorKey() {
        return 'spaces';
    }

    getMessage(word: string) {
        return `No spaces allowed!`;
    }

    validate(currentState: WordSearchState, word: string) {
        return word.indexOf(' ') === -1;
    }
}
