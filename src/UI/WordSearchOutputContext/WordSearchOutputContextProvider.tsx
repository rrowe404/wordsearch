import React, { useState } from 'react';
import { WordSearchGenerationOptions } from 'src/Rules/WordSearchGenerationOptions/WordSearchGenerationOptions';
import { WordSearchOutputContext } from './WordSearchOutputContext';

const WordSearchOutputContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [wordSearchGenerationOptions, setWordSearchGenerationOptions] =
    useState<WordSearchGenerationOptions>(null);

  return (
    <WordSearchOutputContext.Provider
      value={{
        wordSearchGenerationOptions,
        setWordSearchGenerationOptions: (options) =>
          setWordSearchGenerationOptions(options),
      }}
    >
      {children}
    </WordSearchOutputContext.Provider>
  );
};

export { WordSearchOutputContextProvider };
