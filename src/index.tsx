import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';

import './firebase';
import * as serviceWorker from './serviceWorker';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts';
import { App } from './components';
import { GlobalStyle } from './components/Misc';

ReactDOM.render(
  <AuthProvider>
    <App />
    <GlobalStyle />
  </AuthProvider>,
  document.getElementById('root')
);
serviceWorker.unregister();
//registerServiceWorker(toast);
