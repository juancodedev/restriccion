import React from 'react';

export default class Subscribe extends React.Component {
  render() {
    return (
      <section className="subscripcion">
        <h4 className="white-text">Subscríbete para recibir una notificación cuanto estes en restricción</h4>
        <form action="">
          <div className="row">
             <div className="input-field select col s12 m7">
               <select defaultValue="0">
                <option value="0" disabled>Selecciona último dígito de tu patente </option>
                <option value="1">0</option>
                <option value="2">1</option>
                <option value="3">2</option>
                <option value="4">3</option>
                <option value="5">4</option>
                <option value="6">5</option>
                <option value="7">6</option>
                <option value="8">7</option>
                <option value="9">8</option>
                <option value="10">9</option>
              </select>
             </div>
             <div className="col m3 s12 offset-m2">
               <p>
                <input name="sello" type="radio" id="sin_sello" />
                <label htmlFor="sin_sello">Sin sello verde</label>
              </p>
              <p>
                <input name="sello" type="radio" id="con_sello" />
                <label htmlFor="con_sello">Con sello verde</label>
              </p>
             </div>
           </div>
           <div className="row">
             <div className="input-field col s12">
               <input id="email" type="email" className="validate" />
               <label htmlFor="email">Email</label>
             </div>
           </div>
           <div className="row">
             <a className="waves-effect waves-light btn-large"><i className="material-icons left"></i>Enviar</a>
           </div>
        </form>
      </section>
    );
  }
}
