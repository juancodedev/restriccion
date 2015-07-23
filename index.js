// Lets use babel for ESNext features
require('babel/register');

// Connect to App DB
require('./app/modules/connectToDB');

// Requires
const __PRODUCTION__ = require('./app/config/envs').__PRODUCTION__;
const RestrictionDay = require('./app/models/RestrictionDay.js');
const scrape = require('./app/modules/scrape.js');
const scheduleScrapeAndNotifyUsers = require('./app/jobs/scrapeAndNotifyUsers');


// First Scrape
scrape.fetchNumerosRestriccion()
  .then(function(datosRestriccion) {
    console.log('First scrape ok!');
    return RestrictionDay.set(datosRestriccion);
  })
  .then(function(){
    // Schedule Scrape and Notify Users Job
    if(__PRODUCTION__) { scheduleScrapeAndNotifyUsers(1000 * 1, 1000 * 60 * 60); }

    // Run the Server
    require('./server.js');
  })
  .catch(function(err) { console.error(err); });
