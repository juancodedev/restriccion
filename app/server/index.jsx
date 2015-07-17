import readFile from '../modules/readfile-promise';
import {getLatest} from '../models/RestrictionDay';
import server from '../config/server.js';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../components/App.jsx';
import RestrictionDayHandler from '../components/RestrictionDayHandler.jsx';

export default function* (){
  const templatePath = path.join(__dirname, '..', 'views', 'main.html');
  let template = yield readFile(templatePath, {encoding: 'utf8'});

  // Inject webpack hot bundle on development env
  if (process.env.NODE_ENV === 'development') {
    template = template.replace('src="js/client.js"',
       `src="http://localhost:${server.webpackPort}/js/client.js"`);
  }

  // Get Initial App State
  const initialState = yield getLatest();

  // Inject React App
  this.body = template.replace('<%= reactApp %>',
    ReactDOMServer.renderToString(<RestrictionDayHandler children={App} initialState={initialState} />)
  );
}
