import { createStore } from "redux";

function reducer(state, action) {
    switch (action.type) {
        case 'SET_WORDS':
            return { ...state, words: action.words }

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