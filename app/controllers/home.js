import moment from 'moment';
import {getLatest as getLatestRestrictionDay} from '../models/RestrictionDay';
import {ifElse, isEmpty, always, join} from 'ramda';

moment.locale('es');

export default function* (){
  const restrictionDay = yield getLatestRestrictionDay();
  const date = moment(restrictionDay.fecha);

  const displayNumeros =
          ifElse(isEmpty,
            always('Sin Restricción'),
            join('-'));

  yield this.render('main', {
    dayName : date.format('dddd'),
    day     : date.format('DD'),
    month   : date.format('MMMM'),
    year    : date.format('YYYY'),
    estatus : restrictionDay.estatus,
    sinSello: displayNumeros(restrictionDay.numeros.sinSello),
    conSello: displayNumeros(restrictionDay.numeros.conSello)
  });
}
