/**
 * @module RestrictionDay
 * @description a data model representing RestrictionDay
 */

import mongoose from 'mongoose';
import moment from 'moment';

/**
 * RestrictionDay's Schema
 * @param {string} _id
 * @param {date} fecha
 * @param {string} estatus
 * @param {object} numeros
 * @param {array|boolean} numeros.sinSello
 * @param {array|boolean} numeros.conSello
 */
const Schema = mongoose.Schema({
  _id    : String,
  fecha  : Date,
  estatus: String,
  numeros: {
    sinSello: Array,
    conSello: Array
  }
});
const RestrictionDay = mongoose.model('RestrictionDay', Schema);


/**
 * Creates or Updates a RestrictionDay record
 * @param {object} restrictionDayData an object according to RestrictionDay's Schema
 */
export function set(restrictionDayData) {
  const document = new RestrictionDay( addId(restrictionDayData) );
  const query    = {'_id': restrictionDayData._id};

  RestrictionDay
    .findOneAndUpdate(query, document, {upsert: true}, function(err, doc){
      if (err) { return console.error(err); }
      console.log('Saved! : ', doc || document);
    });
}

/**
 * Creates a RestrictionDay record
 * @param {object} restrictionDayData an object according to RestrictionDay's Schema
 */
export function create(restrictionDayData) {
  const document = new RestrictionDay( addId(restrictionDayData) );

  document.save(function (err, doc) {
    if (err) { return console.error(err); }
    console.log('Saved! : ', doc);
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
