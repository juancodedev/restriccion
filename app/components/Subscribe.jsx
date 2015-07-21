/*global $*/
import React from 'react';
import {merge} from 'ramda';
import {put} from 'axios';

export default class Subscribe extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    // Use Materialize custom select input
    $(this.refs.restrictionDigitSelect).material_select(this._handleRestrictionDigitChange.bind(this));
  }

  render() {
    return (
      <section className="subscripcion">
        <h4 className="white-text">Te notificamos cuanto estes en restricción</h4>
        <form action="">
          <div className="row">
             <div className="input-field select col s12 m7">
               <select ref="restrictionDigitSelect" defaultValue="0">
                <option value="" disabled>Selecciona último dígito de tu patente </option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
              </select>
             </div>
             <div className="col m3 s12 offset-m2">
               <p>
                <input onChange={this._handleChange.bind(this, 'sinSelloVerde')} name="sello" type="radio" id="sin_sello" />
                <label htmlFor="sin_sello">Sin sello verde</label>
              </p>
              <p>
                <input onChange={this._handleChange.bind(this, 'conSelloVerde')} name="sello" type="radio" id="con_sello" />
                <label htmlFor="con_sello">Con sello verde</label>
              </p>
             </div>
           </div>
           <div className="row">
             <div className="input-field col s12">
               <input onChange={this._handleChange.bind(this, 'email')} id="email" type="email" className="validate" />
               <label htmlFor="email">Email</label>
             </div>
           </div>
           <div className="row">
             <a onClick={this._handleSubmit.bind(this)} className="waves-effect waves-light btn-large">
               <i className="material-icons left"></i>Enviar
              </a>
           </div>
        </form>
      </section>
    );
  }

  _handleChange(key, e) {
    let value;
    if (key === 'conSelloVerde') {
      key = 'selloVerde';
      value = true;
    } else if (key === 'sinSelloVerde') {
      key = 'selloVerde';
      value = false;
    } else {
      value = e.currentTarget.value;
    }

    this.setState(
      merge(this.state, {[key]: value})); //TODO: e.target en react 0.14.0-beta2
  }

  _handleRestrictionDigitChange() {
    this.setState(
      merge(this.state, {numeroRestriccion: this.refs.restrictionDigitSelect.value}));
  }

  async _handleSubmit() {
    try {
      const response = await put('/users', this.state);
      console.log(response);
    }
    catch (error) {
      console.log(error);
    }
  }
}
