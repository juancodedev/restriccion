import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <header className="Header center-align">
        <img className="responsive-img logo" src="imgs/logo.svg" alt="tengorestriccion" />
        <h4>Restricción Vehicular en Santiago</h4>
      </header>
    );
  }
}
