import kue from 'kue';
const scrape = require('./scrape.js');
const RestrictionDay = require('../models/RestrictionDay.js');
const User = require('../models/User.js');
import {sendEmails} from './mailSender';
const jobs = kue.createQueue();

jobs.process('new_scrape', function (job, done){
  console.log('JOB: ' + JSON.stringify(job));
  scrape.fetchNumerosRestriccion()
    .then(function(scrapedData) {
      RestrictionDay.getLatest()
      .then(function(data){
        const f1 = scrapedData.fecha;
        //console.log('DATE0: '  + f1);
        if(data !== null){
          //console.log('DATE1: '  + f1);
          f1.setHours(0);
          f1.setMinutes(0);
          f1.setSeconds(0);
          const f2 = data.fecha;
          f2.setHours(0);
          f2.setMinutes(0);
          f2.setSeconds(0);

          if(f1 > f2){
            //console.log('DATE2: '  + f1);
            User.allWithRestriction(data.numeros)
            .then(function(users){
              var emails = users.map(function(user){
                return user.email;
              });
              //console.log('Se enviarán los correos...');
              console.log('INFOSCRAPING: ' + JSON.stringify(scrapedData));
              sendEmails(emails, scrapedData);
            });
          }
        }
        RestrictionDay.set(scrapedData);
      });

      done();
    })
    .catch(function(err) { console.error(err); });
});


export function startScraping(ms){
    const scrapeJob = jobs.create('new_scrape')
    //Milliseconds of delay of the job
    .delay(ms)
    //priority of the job
    .priority('high')
    //Attempts if the job fails
    .attempts(5)
    //Delay before another attempt when failed
    .backoff({delay: 30000, type: 'fixed'})
    //time to remain active before it is set to failed
    .ttl(10000);

    scrapeJob
     .on('complete', function (){
       console.log('scrape completed');
         startScraping(600000);
     })
     .on('failed', function (){
       console.log('scrape failed');
     });

    scrapeJob.save(function(err){
      if(err){
        throw err;
      }
    });
}
