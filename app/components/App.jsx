import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';


export default class App extends React.Component {
  /* ES7/2016 Stage-0 es7.classProperties */
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const store = this.props.store;

    return (
      <Provider store={store}>
        {() =>
          <div>
            <Header />
            <Main />
            <hr/>
            <Footer />
          </div>
        }
      </Provider>
    );
  }
}
