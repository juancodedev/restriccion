import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from '../reducers';
import App from '../components/App.jsx';

// Hook regenerator runtime from 'babel-runtime/regenerator' for generators/async support
import _regeneratorRuntime from 'babel-runtime/regenerator';
window.regeneratorRuntime = _regeneratorRuntime;


// Setup Redux & Get Initial App State
const initialState = window.__initialAppState;
const reducer = combineReducers(reducers);
const store = createStore(reducer, initialState, applyMiddleware(thunk));

ReactDOM.render(
  <App store={store} />,
  document.getElementById('appRoot')
);
