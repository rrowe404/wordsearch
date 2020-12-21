import { WordSearchState } from "../WordSearchState/WordSearchState";
import { WordValidator } from "./WordValidator";

export class NoBlankValidator implements WordValidator {
    getErrorKey() {
        return 'blanks';
    }

    getMessage() {
        return `No blanks allowed!`;
    }

    validate(currentState: WordSearchState, word: string) {
        return word;
    }
}