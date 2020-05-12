import { WordSearchGenerationOptions } from 'src/WordSearchGenerationOptions/WordSearchGenerationOptions';

export interface WordSearchGenerationStrategy {
    generate(options: WordSearchGenerationOptions): string[][];
}