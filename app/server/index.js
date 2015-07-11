import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../components/App.jsx';

export default function* (){
  yield this.render('main', {
    reactApp: ReactDOMServer.renderToString(React.createElement(App))
  });
}
