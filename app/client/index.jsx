import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App.jsx';
import get from '../utils/get';
import RestrictionDayHandler from '../components/RestrictionDayHandler.jsx';

get('/restriction_day')
  .then( data => {
    ReactDOM.render(
      <RestrictionDayHandler children={App} initialState={JSON.parse(data)} />,
      document.getElementById('appRoot')
    );
  });
