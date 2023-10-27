import * as React from 'react';
import { Provider } from 'react-redux';
import { ReduxActions } from '../Redux/ReduxActions';
import { ReduxConfig } from '../Redux/ReduxConfig';
import { WordSearchGeneratorFormConnected } from '../WordSearchGeneratorForm/ReactWordSearchGeneratorFormComponent';
import { WordSearchOutputConnected } from '../WordSearchOutput/WordSearchOutputComponent';
import './App.less';

const reduxConfig = new ReduxConfig();
reduxConfig.initialize();

const AppComponent: React.FC = () => {
  const [store] = React.useState(reduxConfig.store);
  store.dispatch({ type: ReduxActions.SetWords, words: [] });

  return (
    <Provider store={store}>
      <WordSearchGeneratorFormConnected />
      <WordSearchOutputConnected />
    </Provider>
  );
};

export { AppComponent };
