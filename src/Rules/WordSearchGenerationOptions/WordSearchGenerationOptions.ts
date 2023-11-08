export interface WordSearchGenerationOptions {
  height: number;
  width: number;

  alphabetizeWordList: boolean;
  showWordList: boolean;
  title: string;

  words: string[];
  filterAccidentalProfanity: boolean;

  allowHorizontal: boolean;
  allowVertical: boolean;
  allowDiagonal: boolean;

  allowBackwards: boolean;
  allowOverlaps: boolean;
  zealousOverlaps: boolean;

  outputOption: string;
}
