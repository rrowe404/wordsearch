import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';

export interface WordValidator {
    getMessage(word: string): string;
    validate(options: WordSearchGenerationOptions, word: string);
}
