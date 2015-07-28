import React from 'react';
import Info from './Info.jsx';
import Subscribe from './Subscribe.jsx';

export default class Main extends React.Component {
  render() {
    return (
        <div className="Main">
          <Info />
          <hr />
          <Subscribe />
        </div>
    );
  }
}
