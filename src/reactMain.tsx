import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './styles.less';

import { AppComponent } from 'src/UI/App/AppComponent';

const root = ReactDOM.createRoot(document.getElementById('react_container'));
root.render(<AppComponent />);
