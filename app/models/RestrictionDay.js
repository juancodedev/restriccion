/**
 * @module RestrictionDay
 * @description a data model representing RestrictionDay
 */

import mongoose from 'mongoose';
import moment from 'moment';
import * as CRUD from './helpers/CRUD.js';
import {log} from '../modules/logger';

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
  return RestrictionDay.findOne({}, {}, { sort: { _id: -1 } })
    .catch( error => {
      log.error({'RestrictionDay#getLatest': { error }});
      return Promise.reject(error);
    });
}


/**
 * Creates or Updates a RestrictionDay record
 * @param {object} restrictionDayData an object according to RestrictionDay's Schema
 */
export function set(restrictionDayData) {
  const data  = addId(restrictionDayData);
  const query = {'_id': data._id};

  CRUD.upsert(RestrictionDay, query, data)
    .catch( error => {
      log.error({'RestrictionDay#set': { restrictionDayData, error }});
      return Promise.reject(error);
    });
}


/**
 * Creates a RestrictionDay record
 * @param {object} restrictionDayData an object according to RestrictionDay's Schema
 */
export function create(restrictionDayData) {
  CRUD.create(RestrictionDay, addId(restrictionDayData))
    .catch( error => {
      log.error({'RestrictionDay#create': { restrictionDayData, error }});
      return Promise.reject(error);
    });
}


/**
 * calulates and adds _id from restrictionDayData.fecha
 * @param {object} restrictionDayData an object according to RestrictionDay's Schema
 * @return {object}
 */
function addId(restrictionDayData) {
  return Object.assign(restrictionDayData, {_id: moment(restrictionDayData.fecha).format('YYYY-MM-DD')});
}
