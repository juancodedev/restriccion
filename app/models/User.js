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
  email  : { type: String, unique: true },
  patente: { type: String, unique: true },
  notify : { type: Boolean, default: true }
});
const User = mongoose.model('User', Schema);


/**
 * Creates a User record
 * @param {object} UserData an object according to User's Schema
 */
export function create(userData) {
  CRUD.create(User, userData)
    .then( doc => console.log('Saved User!', doc) )
    .catch( err => console.error('Error while creating User!', err));
}
