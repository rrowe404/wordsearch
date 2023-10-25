import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';

export interface WordSearchGeneratorFormState {
  currentFormWords: string[];
  generationOptions: WordSearchGenerationOptions;
  wordValidator: (
    generationOptions: WordSearchGenerationOptions,
    value: string
  ) => string;
}
