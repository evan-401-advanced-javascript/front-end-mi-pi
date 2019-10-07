import React from 'react';
import ReactDOM from 'react-dom';
import './styling/index.css';
// import { provider } from 'react-redux';

import App from './app';
// import createStore from './store/index';

// const store = createStore();

const Main = () => {
  return (
    <App />
  );
};

const root = document.getElementById('root');
ReactDOM.render(<Main />, root);
