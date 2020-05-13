import { WordSearchGenerationOptions } from 'src/WordSearchGenerationOptions/WordSearchGenerationOptions';

export interface WordValidator {
    validate(options: WordSearchGenerationOptions, word: string);
}
