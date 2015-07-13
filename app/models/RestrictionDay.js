/**
 * @module RestrictionDay
 * @description a data model representing RestrictionDay
 */

import mongoose from 'mongoose';
import moment from 'moment';
import * as CRUD from './helpers/CRUD.js';

/**
 * RestrictionDay's Schema
 * @param {string} _id
 * @param {date} fecha
 * @param {string} estatus
 * @param {object} numeros
 * @param {array} numeros.sinSello
 * @param {array} numeros.conSello
 */
const schema = mongoose.Schema({
  _id    : { type: String, unique: true },
  fecha  : Date,
  estatus: String,
  numeros: {
    sinSello: Array,
    conSello: Array
  }
});
const RestrictionDay = mongoose.model('RestrictionDay', schema);


/**
 * Gets the latest RestrictionDay record
 * @return {promise} the latest RestrictionDay record
 */
export function getLatest() {
  return RestrictionDay.findOne({}, {}, { sort: { _id: -1 } });
}


/**
 * Creates or Updates a RestrictionDay record
 * @param {object} restrictionDayData an object according to RestrictionDay's Schema
 */
export function set(restrictionDayData) {
  const data  = addId(restrictionDayData);
  const query = {'_id': data._id};

  CRUD.upsert(RestrictionDay, query, data)
    //.then( doc => console.log('Saved RestrictionDay!', doc) )
    .catch( err => console.error('Error while creating RestrictionDay!', err));
}


/**
 * Creates a RestrictionDay record
 * @param {object} restrictionDayData an object according to RestrictionDay's Schema
 */
export function create(restrictionDayData) {
  CRUD.create(RestrictionDay, addId(restrictionDayData))
    //.then( doc => console.log('Saved RestrictionDay!', doc) )
    .catch( err => console.error('Error while creating RestrictionDay!', err));
}


/**
 * calulates and adds _id from restrictionDayData.fecha
 * @param {object} restrictionDayData an object according to RestrictionDay's Schema
 * @return {object}
 */
function addId(restrictionDayData) {
  return Object.assign(restrictionDayData, {_id: moment(restrictionDayData.fecha).format('YYYY-MM-DD')});
}
