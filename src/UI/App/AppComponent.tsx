import * as React from 'react';
import { Provider } from "react-redux";
import { ReduxConfig } from "../Redux/ReduxConfig";
import { WordSearchGeneratorFormConnected } from '../WordSearchGeneratorForm/ReactWordSearchGeneratorFormComponent';

interface AppState {
    store: any;
}

export class AppComponent extends React.Component<{}, AppState> {
    constructor(props) {
        super(props);
        let reduxConfig = new ReduxConfig();
        reduxConfig.initialize();
        this.state = { store: reduxConfig.store };
        reduxConfig.store.dispatch({ type: 'SET_WORDS', words: [] })
    }

    render() {
        return (
            <Provider store={this.state.store}>
                <WordSearchGeneratorFormConnected />
            </Provider>
        )
    }
}