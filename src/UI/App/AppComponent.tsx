import * as React from 'react';
import { WordSearchGeneratorForm } from '../WordSearchGeneratorForm/ReactWordSearchGeneratorFormComponent';
import { WordSearchOutput } from '../WordSearchOutput/WordSearchOutputComponent';
import { WordSearchOutputContextProvider } from '../WordSearchOutputContext/WordSearchOutputContextProvider';
import './App.less';

const AppComponent: React.FC = () => {
  return (
    <WordSearchOutputContextProvider>
      <WordSearchGeneratorForm />
      <WordSearchOutput />
    </WordSearchOutputContextProvider>
  );
};

export { AppComponent };
