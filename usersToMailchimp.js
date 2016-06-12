/*
 * This Script dumps User info to import into Mailchimp lists
 */

// Lets use babel for ESNext features
require('babel/register');

// Connect to App DB
require('./app/modules/connectToDB');

// Requires
const envs = require('./app/config/envs');
const User = require('./app/models/User');

// Main

User.model.where({}, {email: 1, _id: 0})
  .then(function(users) {
    console.log('Email,Numero,SelloVerde');
    users.forEach(function(user){
      console.log(user.email+','+user.numeroRestriccion+','+user.selloVerde);
    });
  });
