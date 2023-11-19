/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { ReduxActions } from './ReduxActions';

function reducer(state, action) {
  switch (action.type) {
    case ReduxActions.GenerateWordSearch:
      return { ...state, wordSearchState: action.state };

    default:
      return { ...state };
  }
}

export class ReduxConfig {
  store: EnhancedStore;

  initialize() {
    this.store = configureStore({ reducer });
  }

  action = (type) => this.store.dispatch({ type });
}
