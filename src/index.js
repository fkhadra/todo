import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './index.css';
import App from 'src/components/App';
import registerServiceWorker from './registerServiceWorker';

import fontawesome from '@fortawesome/fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'

fontawesome.library.add(solid);

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
registerServiceWorker();
