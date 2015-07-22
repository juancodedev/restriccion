// Lets use babel for ESNext features
require('babel/register');

// Connect to App DB
require('./app/modules/connectToDB');

// Requires
const __PRODUCTION__ = require('./app/config/envs').__PRODUCTION__;
const RestrictionDay = require('./app/models/RestrictionDay.js');
const scrape = require('./app/modules/scrape.js');
const startScraping = require('./app/modules/startScrapeJobs');


// First Scrape
scrape.fetchNumerosRestriccion()
  .then(function(datosRestriccion) {
    console.log('First scrape ok!');
    return RestrictionDay.set(datosRestriccion);
  })
  .then(function(){
    // Start Scraping Jobs
    if(__PRODUCTION__) { startScraping(0); }

    // Run the Server
    require('./server.js');
  })
  .catch(function(err) { console.error(err); });
