import * as React from 'react';
import * as ReactDOM from 'react-dom'

import { AppComponent } from 'src/UI/App/AppComponent';

export function init() {
    ReactDOM.render(<AppComponent />, document.getElementById('react_container'));
}
