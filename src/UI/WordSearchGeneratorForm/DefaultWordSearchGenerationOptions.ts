import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';
import outputOptions from './MethodDropdownOptions';

export const DefaultWordSearchGenerationOptions: WordSearchGenerationOptions = {
  height: 30,
  width: 30,
  alphabetizeWordList: false,
  showWordList: true,
  title: '',
  words: [],
  filterAccidentalProfanity: false,
  allowHorizontal: true,
  allowVertical: true,
  allowDiagonal: false,
  allowBackwards: false,
  allowOverlaps: false,
  zealousOverlaps: false,
  outputOption: outputOptions[0].value,
};
