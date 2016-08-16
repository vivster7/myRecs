import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './App';
import configureStore from './configureStore'

const initialState = {
  shelves: {
    1:{
      id: 1,
      name:'Indie',
    },
    2:{
      id: 2,
      name: 'Rock',
    },
  },
  releases: {
    1: {
      id: 1,
      title:' Mumford and Sons',
      shelf: 1,
    },
    2: {
      id: 2,
      title: 'Coldplay',
      shelf: 2,
    },
    3: {
      id: 3,
      title: 'Hozier',
      shelf: 1,
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
