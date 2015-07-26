import React, {PropTypes} from 'react';
import moment from 'moment';
import 'moment/locale/es';
import { connect } from 'react-redux';

moment.locale('es');

@connect(state => ({
  restrictionDay: state.restrictionDay
}))

export default class Info extends React.Component {
  static propTypes = {
    restrictionDay: PropTypes.object.isRequired
  };


  render() {
    const {conSello, sinSello, estatus} = this.props.restrictionDay;
    const fecha = moment.parseZone(this.props.restrictionDay.fecha);
    const day = fecha.format('DD');
    const month = fecha.format('MMMM');
    const year = fecha.format('YYYY');

    function displayNumeros(numeros) {
      if (numeros.length <= 0) {
        return 'Sin Restricción';
      }
      return numeros.join('-');
    }

    function displayDayName(date) {
      const dayName = date.format('dddd');
      const today = moment(new Date());

      if (date.format('DD') === today.format('DD')) {
        return `Hoy ${dayName}`;
      } else if (today.diff(date, 'days') === 1) {
        return `Mañana ${dayName}`;
      }
      return `Para el Dia ${dayName}`;
    }

    return (
      <section className="info">
        <div className="date picker__date-display">
          <div className="picker__weekday-display">{displayDayName(fecha)}</div>
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
              <h4 className="num">{displayNumeros(sinSello)}</h4>
              <h5>Sin sello verde</h5>
            </div>
            <div className="conSello">
              <h4 className="num">{displayNumeros(conSello)}</h4>
              <h5>Con sello verde</h5>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
