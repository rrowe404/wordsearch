import { Injectable } from '@angular/core';
import { WordValidationModule } from './WordValidationModule';
import { WordSearchGenerationOptions } from 'src/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { WordLengthValidator } from './WordLengthValidator';
import { WordValidator } from './WordValidator';

@Injectable({
    providedIn: WordValidationModule
})
export class WordValidationService {
    public validateWord(options: WordSearchGenerationOptions, word: string) {
        let validators: WordValidator[] = [
            new WordLengthValidator()
        ];

        return validators.every(validator => validator.validate(options, word));
    }
}