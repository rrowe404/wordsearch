import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { PlayableWordSearchOutputStrategy } from '../WordSearchOutput/PlayableWordSearchOutputStrategy';

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
  outputOption: PlayableWordSearchOutputStrategy.getValue(),
};

export const DefaultImageWordSearchGenerationOptions = {
  fontSize: 10,
};
