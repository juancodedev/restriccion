import React from 'react';
import moment from 'moment';
moment.locale('es');

export default class Info extends React.Component {
  render() {
    const conSello = this.props.conSello.join('-');
    const sinSello = this.props.sinSello.join('-');
    const dayName = this.props.fecha.format('dddd');
    const day = this.props.fecha.format('DD');
    const month = this.props.fecha.format('MMMM');
    const year = this.props.fecha.format('YYYY');
    const estatus = this.props.estatus;

    return (
      <section className="info">
        <div className="date picker__date-display">
          <div className="picker__weekday-display">Hoy {dayName}</div>
          <div className="picker__day-display">
            <div>{day}</div>
          </div>
          <div className="picker__month-display">
            <div>{month}</div>
          </div>
          <div className="picker__year-display">
            <div>{year}</div>
          </div>
          <h5>{estatus}</h5>
        </div>
        <div className="restriccion">
          <h3>Patentes terminadas en:</h3>
          <div className="numeros">
            <div className="sinSello">
              <h4 className="num">{sinSello}</h4>
              <h5>Sin sello verde</h5>
            </div>
            <div className="conSello">
              <h4 className="num">{conSello}</h4>
              <h5>Con sello verde</h5>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
