/*
 * This Script notifies restricted users for the latest restrictionDayData in the DB
 */

// Lets use babel for ESNext features
require('babel/register');

// Connect to App DB
require('./app/modules/connectToDB');

// Requires
const envs = require('./app/config/envs');
const __PRODUCTION__ = envs.__PRODUCTION__;
const __DEVELOPMENT__ = envs.__DEVELOPMENT__;
const RestrictionDay = require('./app/models/RestrictionDay');
const User = require('./app/models/User');
const job = require('./app/jobs/notifyRestrictedUsersJob');

// Main
RestrictionDay.getLatest()
  .then(function(restrictionDayData) {
    console.log(restrictionDayData);

    User.allWithRestriction(restrictionDayData.numeros)
      .then(function(users) {
        console.log(users, restrictionDayData);
        job.addNotifyRestrictedUsersJob(users, restrictionDayData);
      });
  });
