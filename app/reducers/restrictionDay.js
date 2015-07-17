import { SET_LATEST_RESTRICTION_DAY } from '../constants/ActionTypes';


export default function restrictionDay(state = {}, action) {
  switch (action.type) {
  case SET_LATEST_RESTRICTION_DAY:
    const day = action.restrictionDay;
    return {
      conSello: day.numeros.conSello,
      sinSello: day.numeros.sinSello,
      fecha   : day.fecha,
      estatus : day.estatus
    };
  default:
    return state;
  }
}
