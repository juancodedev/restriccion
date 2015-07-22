// Lets use babel for ESNext features
require('babel/register');

// Connect to App DB
require('./app/modules/connectToDB');

const RestrictionDay = require('./app/models/RestrictionDay.js');
const scrape = require('./app/modules/scrape.js');


scrape.fetchNumerosRestriccion()
.then(function(datosRestriccion) {
  console.log('Primer scrape ok!');
  return RestrictionDay.set(datosRestriccion);
})
.then(function(){
  // Run the Server
  require('./server.js');
})
.catch(function(err) { console.error(err); });
