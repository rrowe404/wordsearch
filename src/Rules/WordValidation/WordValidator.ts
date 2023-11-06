import { WordSearchGenerationOptions } from '../WordSearchGenerationOptions/WordSearchGenerationOptions';

export interface WordValidator {
  getErrorKey(): string;
  getMessage(word: string): string;
  validate(options: WordSearchGenerationOptions, word: string);
}
