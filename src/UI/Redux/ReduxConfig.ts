import { createStore } from "redux";
import { ReduxActions } from "./ReduxActions";

function reducer(state, action) {
    switch (action.type) {
        case ReduxActions.GenerateWordSearch:
            return { ...state, wordSearchState: action.state };

        case ReduxActions.SetWords:
            return { ...state, words: action.words };

        default:
            return state;
    }
}

export class ReduxConfig {
    store;

    initialize() {
        this.store = createStore(reducer);
    }

    action = (type) => this.store.dispatch({type});
}