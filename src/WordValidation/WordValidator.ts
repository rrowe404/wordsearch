import { WordSearchGenerationOptions } from 'src/WordSearchGenerationOptions/WordSearchGenerationOptions';

export interface WordValidator {
    getMessage(word: string): string;
    validate(options: WordSearchGenerationOptions, word: string);
}
