import { EnhancedStore } from '@reduxjs/toolkit';
import * as React from 'react';
import { Provider } from 'react-redux';
import { ReduxConfig } from '../Redux/ReduxConfig';
import { WordSearchGeneratorForm } from '../WordSearchGeneratorForm/ReactWordSearchGeneratorFormComponent';
import { WordSearchOutput } from '../WordSearchOutput/WordSearchOutputComponent';
import { WordSearchOutputContextProvider } from '../WordSearchOutputContext/WordSearchOutputContextProvider';
import './App.less';

const reduxConfig = new ReduxConfig();
reduxConfig.initialize();

const AppComponent: React.FC = () => {
  const [store] = React.useState<EnhancedStore>(reduxConfig.store);

  return (
    <Provider store={store}>
      <WordSearchOutputContextProvider>
        <WordSearchGeneratorForm />
        <WordSearchOutput />
      </WordSearchOutputContextProvider>
    </Provider>
  );
};

export { AppComponent };
