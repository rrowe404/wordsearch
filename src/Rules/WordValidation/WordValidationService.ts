import { WordValidator } from './WordValidator';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { NoSpaceValidator } from './NoSpaceValidator';
import { WordLengthValidator } from './WordLengthValidator';
import { NoBlankValidator } from './NoBlankValidator';

export class WordValidationService {
    private validators: WordValidator[] = [
        new NoBlankValidator(),
        new NoSpaceValidator(),
        new WordLengthValidator()
    ];

    public getErrors(currentState: WordSearchState, word: string) {
        // if one fails we won't bother with the rest -- it's just clutter until the original error has been fixed imo

        let violatedValidator = this.validators.find(validator => !validator.validate(currentState, word));

        let errors = {};

        if (violatedValidator) {
            errors[violatedValidator.getErrorKey()] = violatedValidator.getMessage(word);
        }

        return errors;
    }

    public hasErrors(currentState: WordSearchState, word: string) {
        return Object.keys(this.getErrors(currentState, word)).length !== 0;
    }
}
