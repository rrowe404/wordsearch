import * as React from 'react';
import { Provider } from 'react-redux';
import { ReduxActions } from '../Redux/ReduxActions';
import { ReduxConfig } from '../Redux/ReduxConfig';
import { WordSearchGeneratorFormConnected } from '../WordSearchGeneratorForm/ReactWordSearchGeneratorFormComponent';
import { WordSearchOutputConnected } from '../WordSearchOutput/WordSearchOutputComponent';

interface AppState {
    store: any;
}

export class AppComponent extends React.Component<{}, AppState> {
    constructor(props) {
        super(props);
        let reduxConfig = new ReduxConfig();
        reduxConfig.initialize();
        this.state = { store: reduxConfig.store };
        reduxConfig.store.dispatch({ type: ReduxActions.SetWords, words: [] });
    }

    render() {
        return (
            <Provider store={this.state.store}>
                <WordSearchGeneratorFormConnected />
                <WordSearchOutputConnected />
            </Provider>
        );
    }
}
