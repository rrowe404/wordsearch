import React from 'react';
import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';

interface WordSearchOutputContextInterface {
  wordSearchGenerationOptions: WordSearchGenerationOptions;
  setWordSearchGenerationOptions: (
    options: WordSearchGenerationOptions
  ) => void;
}

const WordSearchOutputContext =
  React.createContext<WordSearchOutputContextInterface>({
    wordSearchGenerationOptions: null,
    setWordSearchGenerationOptions: () => null,
  });

export { WordSearchOutputContext };
