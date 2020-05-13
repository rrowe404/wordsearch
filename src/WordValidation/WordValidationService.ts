import { Injectable } from '@angular/core';
import { WordValidationModule } from './WordValidationModule';
import { WordSearchGenerationOptions } from 'src/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { WordLengthValidator } from './WordLengthValidator';
import { WordValidator } from './WordValidator';

@Injectable({
    providedIn: WordValidationModule
})
export class WordValidationService {
    private validators: WordValidator[] = [
        new WordLengthValidator()
    ];

    public getMessages(options: WordSearchGenerationOptions, word: string) {
        let violatedValidators = this.validators.filter(validator => !validator.validate(options, word));

        let messages = violatedValidators.map(validator => validator.getMessage(word));

        return messages;
    }

    public validateWord(options: WordSearchGenerationOptions, word: string) {
        return this.validators.every(validator => validator.validate(options, word));
    }
}