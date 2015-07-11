import readFile from '../modules/readfile-promise';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../components/App.jsx';

export default function* (){
  const templatePath = path.join(__dirname, '..', 'views', 'main.html');
  const template = yield readFile(templatePath, {encoding: 'utf8'});

  this.body = template.replace('<%= reactApp %>', ReactDOMServer.renderToString(React.createElement(App)));
}
