/*global $*/
import React from 'react';
import {merge} from 'ramda';
import {put} from 'axios';
import {isEmail} from 'validator';
import {getValidatorClass, allValid} from '../utils/formHelper';
import Loading from './Loading.jsx';
import Alert from './Alert.jsx';


export default class Subscribe extends React.Component {
  constructor() {
    super();
    this.state = {
      user   : {},
      alert  : { message: '', isError: false, show: false, initial: true },
      loading: { initial: true, show: false },
      valid  : {
        email            : null,
        selloVerde       : null,
        numeroRestriccion: null
      }
    };
  }

  componentDidMount() {
    // Use Materialize custom select input
    $(this.refs.restrictionDigitSelect).material_select(this._handleRestrictionDigitChange.bind(this));
  }

  render() {
    const emailClass = `${getValidatorClass(this.state.valid.email)}`;
    const submitClass = `${allValid(this.state.valid) ? null : 'disabled'} waves-effect waves-light btn-large`;

    return (
      <section className="Subscribe">
        <h4 className="white-text">¿Te avisamos cuanto tengas restricción?</h4>
        <form action="">
          <div className="row">
            <div className="input-field select col s12 m7">
              <select ref="restrictionDigitSelect" defaultValue="">
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
                <input onChange={this._handleEmailChange.bind(this)} onKeyPress={this._handleKeyPress.bind(this)} id="email" type="email" className={emailClass} />
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="row">
              <a onClick={this._handleSubmit.bind(this)} className={submitClass}>
                <i className="material-icons left"></i>Enviar
              </a>
            </div>
            <div className="row">
              <Loading
                initial = {this.state.loading.initial}
                show    = {this.state.loading.show} />

              <Alert
                message = {this.state.alert.message}
                isError = {this.state.alert.isError}
                initial = {this.state.alert.initial}
                show    = {this.state.alert.show}
                onClick = {this._handleAlertClick.bind(this)} />
            </div>
        </form>
      </section>
    );
  }

  _handleChange(key) {
    const value = (key === 'conSelloVerde');
    this._setFormInputState('selloVerde', value, true);
  }

  _handleEmailChange(e) {
    const value = e.currentTarget.value; //TODO: e.target en react > 0.14.0-beta2
    this._setFormInputState('email', value, isEmail(value));
  }

  _handleRestrictionDigitChange() {
    this._setFormInputState('numeroRestriccion', this.refs.restrictionDigitSelect.value, true);
  }

  _setFormInputState(key, value, isValid) {
    this.setState(
      merge(this.state, {
        user : merge(this.state.user, {[key]: value}),
        valid: merge(this.state.valid, {[key]: isValid})
      }));
  }

  async _handleSubmit() {
    if(!allValid(this.state.valid)) { return false; }

    this.setState(
      merge(this.state, { loading: {initial: false, show: true} }));

    try {
      await put('/users', this.state.user);
      this.setState(
        merge(this.state, {
          alert: {
            message: 'Recibido!, te notificaremos cuando tengas restricción =)',
            isError: false,
            show   : true,
            initial: false
          }}));
    }
    catch (error) {
      this.setState(
        merge(this.state, {
          alert: { message: error.data.errors[0].description, isError: true, show: true, initial: false } }));
    }
    finally {
      this.setState(
        merge(this.state, { loading: {initial: false, show: false} }));
    }
  }

  _handleAlertClick() {
    this.setState(
      merge(this.state, {
        alert: merge(this.state.alert, { show: false, initial: false })
      })
    );
  }

  _handleKeyPress(e) {
    var ENTER = 13;
    if( e.which === ENTER ) {
      this._handleSubmit();
    }
  }
}
