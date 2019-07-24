import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';

//import { toast } from "react-toastify";
//import registerServiceWorker from './registerServiceWorker';
import './firebase';
import * as serviceWorker from './serviceWorker';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { AuthProvider } from './contexts';
import { App } from './components';

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
);
serviceWorker.unregister();
//registerServiceWorker(toast);
