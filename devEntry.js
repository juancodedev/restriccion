require("babel/register");
const scrape = require('./app/modules/scrape.js');


scrape.fetchNumerosRestriccion()
  .then(function(x) { console.log(x); });
