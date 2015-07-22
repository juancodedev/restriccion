require('./app/modules/connectToDB.js');
const scrape = require('./app/modules/scrape.js');
//const RestrictionDay = require('./app/models/RestrictionDay.js');
//const User = require('./app/models/User.js');
//import {addEmailToQueue} from './app/modules/mailSender';
import {sendEmails} from './app/modules/mailSender';
//import {startScraping} from './app/modules/startScrapeJobs';
//import {startScraping} from './app/modules/startScrapeJobs.js';

/**
var us1 = {
  email            : 'slabsuno@mailinator.com',
  selloVerde       : false,
  numeroRestriccion: 9
};
var us2 = {
  email            : 'slabsdos@mailinator.com',
  selloVerde       : false,
  numeroRestriccion: 0
};
var us3 = {
  email            : 'slabstres@mailinator.com',
  selloVerde       : false,
  numeroRestriccion: 1
};
var us4 = {
  email            : 'slabscuatro@mailinator.com',
  selloVerde       : false,
  numeroRestriccion: 2
};
var us5 = {
  email            : 'slabscinco@mailinator.com',
  selloVerde       : true,
  numeroRestriccion: 9
};
var us6 = {
  email            : 'slabsseis@mailinator.com',
  selloVerde       : true,
  numeroRestriccion: 0
};
var us7 = {
  email            : 'slabssiete@mailinator.com',
  selloVerde       : false,
  numeroRestriccion: 8
};
var us8 = {
  email            : 'slabsocho@mailinator.com',
  selloVerde       : true,
  numeroRestriccion: 7
};


User.create(us1);
User.create(us2);
User.create(us3);
User.create(us4);
User.create(us5);
User.create(us6);
User.create(us7);
User.create(us8);

**/




//startScraping(0);

scrape.fetchNumerosRestriccion()
  .then(function(datosRestriccion) {
    //RestrictionDay.set(datosRestriccion);
    //return User.allWithRestriction(datosRestriccion.numeros);

    var emails = [{
        'email': 'slabsuno@mailinator.com',
        'name' : 'slabs',
        'type' : 'to',
        'token': 'TEST_TOKEN1'
      },
      {
        'email': 'slabsdos@mailinator.com',
        'name' : 'slabs',
        'type' : 'to',
        'token': 'TEST_TOKEN2'
      },
      {
        'email': 'slabstres@mailinator.com',
        'name' : 'slabs',
        'type' : 'to',
        'token': 'TEST_TOKEN3'
      }
    ];

    sendEmails(emails, datosRestriccion);
    //console.log(datosRestriccion);
  })
  .then(function(users) {
    console.log('Usuarios con Restriccion: ', users);
    //return RestrictionDay.getLatest();
  })
  .then(function(data) { console.log(data); })
  .catch(function(err) { console.error(err); });




/**
emails.forEach(em => {
  var email = [em];
  addEmailToQueue(email)
  .then(function(){
    console.log('FUNCIONO EL ENVÍO');
  })
  .catch(function(){
    console.log('ERROR EN EL ENVÍO');
  });
});
**/
