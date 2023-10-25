import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';

export interface WordSearchGeneratorFormState {
  currentFormWords: string[];
  generationOptions: WordSearchGenerationOptions;
}
