/**
 * @module User
 * @description a data model representing an User
 */

import mongoose from 'mongoose';
import * as CRUD from './helpers/CRUD.js';
import {log} from '../modules/logger';

// Create a token generator with the default settings:
const randToken = require('rand-token');

/**
 * User's Schema
 * @param {string} email
 * @param {string} numeroRestriccion
 * @param {boolean} notify whether or not to send notifications to user
 */
const schema = mongoose.Schema({
  email            : { type: String, unique: true },
  notify           : { type: Boolean, default: true },
  selloVerde       : { type: Boolean, required: true },
  numeroRestriccion: { type: Number, required: true },
  token            : { type: String, required: true, unique: true }
});

/*
 * Validations
 */
schema.path('email').validate(email => {
   var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
   return emailRegex.test(email);
}, 'The e-mail field cannot be empty.');

const User = mongoose.model('User', schema);
export const model = User;


/**
 * Creates a User record
 * @param {object} UserData an object according to User's Schema
 */
export function create(userData) {
  const userToken = randToken.generate(16);
  userData.token = userToken;
  return CRUD.create(User, userData)
    .catch( error => {
      log.error({'User#create': { userData, error }});
      return Promise.reject(error);
    });
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
      .exec((error, doc) => {
        if (error) {
          log.error({'User#allWithRestriction': { numbers, error }});
          reject(error);
        }
        resolve(doc);
      });
  });
}


/**
 * un-subscribe an User from notifications
 * @param {string} email
 */
// TODO: cambiamos notify a false para el usuario
export function unSubscribe(email) {
  return CRUD.update(User, {email}, {notify: false})
    .catch( error => {
      log.error({'User#unSubscribe': { email, error }});
      return Promise.reject(error);
    });
}
