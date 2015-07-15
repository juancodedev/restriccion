require('./app/modules/connectToDB.js');
const scrape = require('./app/modules/scrape.js');
const RestrictionDay = require('./app/models/RestrictionDay.js');
const User = require('./app/models/User.js');
//import {sendEmail} from './app/modules/mailSender';

scrape.fetchNumerosRestriccion()
  .then(function(datosRestriccion) {
    RestrictionDay.set(datosRestriccion);
    return User.allWithRestriction(datosRestriccion.numeros);
  })
  .then(function(users) {
    console.log('Usuarios con Restriccion: ', users);
    return RestrictionDay.getLatest();
  })
  .then(function(data) { console.log(data); })
  .catch(function(err) { console.error(err); });
