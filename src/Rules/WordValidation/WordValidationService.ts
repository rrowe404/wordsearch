import { Injectable, Inject } from '@angular/core';
import { WordValidationModule } from './WordValidationModule';
import { WordValidator } from './WordValidator';
import { WordSearchState } from '../WordSearchState/WordSearchState';
import { VALIDATORS } from './VALIDATORS';

@Injectable({
    providedIn: WordValidationModule
})
export class WordValidationService {
    constructor(
        @Inject(VALIDATORS) private validators: WordValidator[]
    ) {
    }

    public getErrors(currentState: WordSearchState, word: string) {
        let violatedValidators = this.validators.filter(validator => !validator.validate(currentState, word));

        let errors = {};

        violatedValidators.forEach(validator => {
            errors[validator.getErrorKey()] = validator.getMessage(word);
        });

        return errors;
    }

    public hasErrors(currentState: WordSearchState, word: string) {
        return Object.keys(this.getErrors(currentState, word)).length !== 0;
    }
}
