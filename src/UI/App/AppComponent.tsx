import { EnhancedStore } from '@reduxjs/toolkit';
import * as React from 'react';
import { Provider } from 'react-redux';
import { ReduxConfig } from '../Redux/ReduxConfig';
import { WordSearchGeneratorFormConnected } from '../WordSearchGeneratorForm/ReactWordSearchGeneratorFormComponent';
import { WordSearchOutputConnected } from '../WordSearchOutput/WordSearchOutputComponent';
import './App.less';

const reduxConfig = new ReduxConfig();
reduxConfig.initialize();

const AppComponent: React.FC = () => {
  const [store] = React.useState<EnhancedStore>(reduxConfig.store);

  return (
    <Provider store={store}>
      <WordSearchGeneratorFormConnected />
      <WordSearchOutputConnected />
    </Provider>
  );
};

export { AppComponent };
