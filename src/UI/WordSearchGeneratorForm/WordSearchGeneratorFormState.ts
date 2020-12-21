import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { DropdownOption } from '../Dropdown/DropdownOption';

export interface WordSearchGeneratorFormState {
    currentFormWords: string[];
    generationOptions: WordSearchGenerationOptions;
    outputOptions: DropdownOption<string>[];
    wordValidator: (generationOptions: WordSearchGenerationOptions, value: string) => string;
}
