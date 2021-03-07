import React from 'react';
import ReactDOM from 'react-dom';
import '@ionic/react/css/core.css';
import './styles.css';
import './styles.styl';
import App from './App';

const registerServiceWorker = () =>
  'serviceWorker' in navigator &&
    navigator.serviceWorker.register('/service-worker.js');

registerServiceWorker();

const appContainer = document.getElementById('app');
ReactDOM.render(<App />, appContainer);
