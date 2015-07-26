require('./app/modules/connectToDB.js');
const scrape = require('./app/modules/scrape.js');
const scheduleScrapeAndNotifyUsers = require('./app/jobs/scrapeAndNotifyUsers');



scrape.fetchNumerosRestriccion()
  .then(function(datosRestriccion) {
    scheduleScrapeAndNotifyUsers(1000 * 10, 1000 * 60);
  });
