require("babel/register");
require('./app/modules/connectToDB.js');
const scrape = require('./app/modules/scrape.js');
const RestrictionDay = require('./app/models/RestrictionDay.js');
const User = require('./app/models/User.js');

User.create({
  email  : 'yo@yo.cl',
  patente: '123456-123',
  notify : true
});

scrape.fetchNumerosRestriccion()
  .then(function(numeros) { RestrictionDay.set(numeros); })
  .catch(function(err) { console.error(err); });
