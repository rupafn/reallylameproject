import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// Firebase App is always required and must be first




ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
