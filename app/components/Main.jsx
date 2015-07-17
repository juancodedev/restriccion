import React from 'react';
import Info from './Info.jsx';
import Subscribe from './Subscribe.jsx';

export default class Main extends React.Component {
  render() {
    return (
        <div className="main">
          <Info
            conSello = {this.props.info.numeros.conSello}
            sinSello = {this.props.info.numeros.sinSello}
            fecha = {this.props.info.fecha}
            estatus = {this.props.info.estatus}
             />
          <hr />
          <Subscribe />
        </div>
    );
  }
}
