import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Popup from './Pages/Popup';
import * as serviceWorker from './serviceWorker';

if (document.getElementById('root')) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
} else if (document.getElementById('popup')) {
  ReactDOM.render(
    <React.StrictMode>
      <Popup />
    </React.StrictMode>,
    document.getElementById('popup')
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
