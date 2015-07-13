import readFile from '../modules/readfile-promise';
import server from '../config/server.js';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../components/App.jsx';

export default function* (){
  const templatePath = path.join(__dirname, '..', 'views', 'main.html');
  let template = yield readFile(templatePath, {encoding: 'utf8'});

  if (process.env.NODE_ENV === 'development') { // inject webpack hot bundle
    template = template.replace('src="js/client.js"',
       `src="http://localhost:${server.webpackPort}/js/client.js"`);
  }

  // inject React App
  this.body = template.replace('<%= reactApp %>',
    ReactDOMServer.renderToString(React.createElement(App)));
}
