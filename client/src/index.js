import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import '../assets/sass/style.scss';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers';

import RoutesApp from './RoutesApp';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(rootReducer)}>
    <BrowserRouter>
      <RoutesApp />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
