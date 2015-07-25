require('./app/modules/connectToDB.js');
const scrape = require('./app/modules/scrape.js');


scrape.fetchNumerosRestriccion()
  .then(function(datosRestriccion) {
    console.log(datosRestriccion);
  });
