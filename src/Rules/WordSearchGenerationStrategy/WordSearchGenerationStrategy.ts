import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';

export interface WordSearchGenerationStrategy {
    generate(options: WordSearchGenerationOptions): string[][];
}