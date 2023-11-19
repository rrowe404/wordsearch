import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';
import outputOptions from './MethodDropdownOptions';

export const DefaultWordSearchGenerationOptions: WordSearchGenerationOptions = {
  height: 10,
  width: 10,
  alphabetizeWordList: false,
  showWordList: true,
  title: '',
  wordList: '',
  filterAccidentalProfanity: false,
  allowHorizontal: true,
  allowVertical: true,
  allowDiagonal: false,
  allowBackwards: false,
  allowOverlaps: false,
  zealousOverlaps: false,
  outputOption: outputOptions[0].value,
};
