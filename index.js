// Lets use babel for ESNext features
require('babel/register');

// Connect to App DB
require('./app/modules/connectToDB');

// Requires
const envs = require('./app/config/envs');
const __PRODUCTION__ = envs.__PRODUCTION__;
const __DEVELOPMENT__ = envs.__DEVELOPMENT__;
const RestrictionDay = require('./app/models/RestrictionDay.js');
const scrape = require('./app/modules/scrape.js');
const scheduleScrapeAndNotifyUsers = require('./app/jobs/scrapeAndNotifyUsersJob');


// First Scrape
RestrictionDay.getLatest()
  .then(function(restrictionDay){
    if (restrictionDay.length === 0 || __DEVELOPMENT__) { return scrapeAndSave(); }
    return restrictionDay;
  })
  .then(function(){
    // Schedule "Scrape and Notify Users" Job
    if(__PRODUCTION__) { scheduleScrapeAndNotifyUsers(1000 * 30, 1000 * 60 * 30); }

    // Run the Server
    require('./server.js');
  })
  .catch(function(err) { console.error(err); });


function scrapeAndSave() {
  return scrape.fetchNumerosRestriccion()
    .then(function(datosRestriccion) {
      console.log('First scrape ok!', datosRestriccion);
      return RestrictionDay.set(datosRestriccion);
    });
}
