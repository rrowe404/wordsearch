export const WordSearchOutputOption = {
  Image: 'image',
  Playable: 'playable',
  Console: 'console',
} as const;

export type WordSearchOutputOptionValue =
  (typeof WordSearchOutputOption)[keyof typeof WordSearchOutputOption];

export interface WordSearchGenerationOptionsBase {
  height: number;
  width: number;

  alphabetizeWordList: boolean;
  showWordList: boolean;
  title: string;

  wordList: string;
  filterAccidentalProfanity: boolean;

  allowHorizontal: boolean;
  allowVertical: boolean;
  allowDiagonal: boolean;

  allowBackwards: boolean;
  allowOverlaps: boolean;
  zealousOverlaps: boolean;
}

export type WordSearchGenerationOptions =
  | (WordSearchGenerationOptionsBase & {
      outputOption: typeof WordSearchOutputOption.Image;
      fontSize: number;
    })
  | (WordSearchGenerationOptionsBase & {
      outputOption:
        | typeof WordSearchOutputOption.Playable
        | typeof WordSearchOutputOption.Console;
    });
