import { Injectable } from '@angular/core';
import { WordValidationModule } from './WordValidationModule';
import { WordLengthValidator } from './WordLengthValidator';
import { WordValidator } from './WordValidator';
import { WordSearchState } from '../WordSearchState/WordSearchState';

@Injectable({
    providedIn: WordValidationModule
})
export class WordValidationService {
    private validators: WordValidator[] = [
        new WordLengthValidator()
    ];

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