import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import App from 'src/components/App';
import registerServiceWorker from './registerServiceWorker';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
registerServiceWorker();
