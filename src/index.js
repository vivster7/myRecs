import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './App';
import configureStore from './configureStore'

const initialState = {
  shelves: {
    1:{
      key: 1,
      name:'Indie',
      releases:[1,3]
    },
    2:{
      key: 2,
      name: 'Rock',
      releases:[2]
    },
  },
  releases: {
    1: {
      key: 1,
      title:' Mumford and Sons'
    },
    2: {
      key: 2,
      title: 'Coldplay'
    },
    3: {
      key: 3,
      title: 'Hozier'
    }
  }
};

const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
