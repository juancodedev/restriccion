require("babel/register");
require('./app/modules/connectToDB.js');
const scrape = require('./app/modules/scrape.js');
const RestrictionDay = require('./app/models/RestrictionDay.js');

scrape.fetchNumerosRestriccion()
  .then(function(x) { RestrictionDay.set(x); });
