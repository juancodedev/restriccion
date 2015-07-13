import React from 'react';
import moment from 'moment';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      _id    : '2015-07-01',
      fecha  : moment('2015-07-01T17:18:04.343Z'),
      estatus: 'Preemergencia Ambiental',
      numeros: {
          conSello: [
              3,
              4
          ],
          sinSello: [
              3,
              4,
              5,
              6,
              1,
              2
          ]
      }
    };
  }

  render() {
    return (
      <div>
        <Header />
        <Main />
        <hr/>
        <Footer />
      </div>
    );
  }
}
