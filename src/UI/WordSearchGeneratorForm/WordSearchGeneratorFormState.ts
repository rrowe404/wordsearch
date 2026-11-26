import {
  WordSearchGenerationOptionsBase,
  WordSearchOutputOptionValue,
} from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';

export interface WordSearchGeneratorFormState
  extends WordSearchGenerationOptionsBase {
  outputOption: WordSearchOutputOptionValue;
  fontSize: number;
}
