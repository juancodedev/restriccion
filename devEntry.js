require("babel/register");
const scrape = require('./lib/scrape.js');


scrape.numerosRestriccion
  .then(function(x) { console.log(x); });
