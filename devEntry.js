require('./app/modules/connectToDB.js');
const scrape = require('./app/modules/scrape.js');
const scheduleScrapeAndNotifyUsers = require('./app/jobs/scrapeAndNotifyUsersJob');

const User = require('./app/models/User');

const {sendWelcomeEmail} = require('./app/modules/mailSender.js');



scrape.fetchNumerosRestriccion()
  .then(function(datosRestriccion) {
    console.log(datosRestriccion);
    //scheduleScrapeAndNotifyUsers(1000 * 10, 1000 * 60);
  });

/*
User.find({email: 'nicolas@santiagolab.cl'})
  .then( x => sendWelcomeEmail(x))
  .then( x => console.log(x) );
  */
