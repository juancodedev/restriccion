/**
 * @module User
 * @description a data model representing an User
 */

import mongoose from 'mongoose';
import * as CRUD from './helpers/CRUD.js';

/**
 * User's Schema
 * @param {string} email
 * @param {string} patente
 * @param {boolean} notify whether or not to send notifications to user
 */
const Schema = mongoose.Schema({
  email            : { type: String, unique: true },
  notify           : { type: Boolean, default: true },
  patente          : String,
  selloVerde       : Boolean,
  numeroRestriccion: { type: Number, required: true }
});
const User = mongoose.model('User', Schema);


/**
 * Creates a User record
 * @param {object} UserData an object according to User's Schema
 */
export function create(userData) {
  CRUD.create(User, addNumeroRestriccion(userData))
    .then( doc => console.log('Saved User!', doc) )
    .catch( err => console.error('Error while creating User!', err));
}


/**
 * Finds all Users with Restriction
 * @param {object} numbers
 * @param {array} numbers.sinSello an array of restricted sin sello numbers
 * @param {array} numbers.conSello an array of restricted con sello numbers
 * @return {promise} Promise containing found Users
 */
export function allWithRestriction(numbers) {
  return new Promise(function(resolve, reject){
    User.find(
      { $or: [
          { selloVerde: 'true', numeroRestriccion: {$in: numbers.conSello} },
          { selloVerde: 'false', numeroRestriccion: {$in: numbers.sinSello} }
        ]
      })
      .exec((err, doc) => {
        if (err) { reject(err); }
        resolve(doc);
      });
  });
}


/**
 * Get the restricted patente number
 * @param  {string} patente
 * @return {number}
 */
function restrictedPatenteNumber(patente) {
  const number = parseInt(patente.slice(-1));
  if (Number.isNaN(number)) {
    throw Error("Error: Couldn't get restricted patente number; maybe patente is empty or incorrect?");
  }
  return number;
}

/**
 * Calulates and adds numeroRestriccion from userData.patente
 * @param {object} userData an object according to User's Schema
 * @return {object}
 */
function addNumeroRestriccion(userData) {
  return Object.assign(userData, {numeroRestriccion: restrictedPatenteNumber(userData.patente)} );
}
