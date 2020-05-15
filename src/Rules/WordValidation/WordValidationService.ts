import { Injectable } from '@angular/core';
import { WordValidationModule } from './WordValidationModule';
import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';
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

    public getMessages(currentState: WordSearchState, word: string) {
        let violatedValidators = this.validators.filter(validator => !validator.validate(currentState, word));

        let messages = violatedValidators.map(validator => validator.getMessage(word));

        return messages;
    }

    public validateWord(currentState: WordSearchState, word: string) {
        return this.validators.every(validator => validator.validate(currentState, word));
    }
}