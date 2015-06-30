require("babel/register");
require('./app/modules/connectToDB.js');
const moment = require('moment');
const RestrictionDay = require('./app/models/RestrictionDay.js');

RestrictionDay.set({
  _id    : "12-10-1925",
  fecha  : moment("10-10-1925", "DD-MM-YYYY"),
  estatus: "Ambiente Nuclear",
  numeros: {
    sinSello: [1, 2, 3, 4, 5],
    conSello: false
  }
});

/*
scrape.fetchNumerosRestriccion()
  .then(function(x) { console.log(x); });
*/
