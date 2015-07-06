require('./app/modules/connectToDB.js');
//const scrape = require('./app/modules/scrape.js');
//const RestrictionDay = require('./app/models/RestrictionDay.js');
const User = require('./app/models/User.js');

User.create({
  email            : '1@gris.cl',
  selloVerde       : false,
  numeroRestriccion: 1
});

/*
scrape.fetchNumerosRestriccion()
  .then(function(datosRestriccion) {
    console.log(datosRestriccion);
    RestrictionDay.set(datosRestriccion);
    return User.allWithRestriction(datosRestriccion.numeros);
  })
  .then(function(users) { console.log("Usuarios con Restriccion: ", users); })
  .catch(function(err) { console.error(err); });
*/
