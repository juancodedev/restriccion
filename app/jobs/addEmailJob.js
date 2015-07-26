import kue from 'kue';
import {splitEvery} from 'ramda';
import {sendEmail} from '../modules/mailSender';
import {host} from '../config/redis';

const jobs = kue.createQueue({
  redis: {
    host: host
  }
});


jobs.process('new_email', function (job, done){
  sendEmail(job.data.emails, job.data.info, done);
});


//TODO: revisar la api, "prepareEmails" no deberia encolar por si mismo
/**
 * prepareEmails TODO
 * @param  {array} userArray is the array sent to be divided
 * @param  {object} info is the object with the latest scraped data
 */
export function prepareEmails(userArray, info) {
  const divideUsers = splitEvery(150);
  const newArray = divideUsers(userArray);

  //Add emails to Queue
  newArray.forEach(em => {
    addEmailToQueue(em, info);
  });
}


/**
 * Adds an email Job to the queue
 * @param  {array, object} email array with the recipient data and scrapedInfo object
 * @return {promise}
 */
export function addEmailToQueue(emails, info){
    const emailJob = jobs.create('new_email', {
      emails,
      info
    })
    .priority('high') //priority of the job
    .attempts(5) //Attempts if the job fails
    .backoff({delay: 30000, type: 'fixed'}) //Delay before another attempt when failed
    .ttl(10000); //time to remain active before it is set to failed

    emailJob
     .on('complete', function (){
       console.log('El correo ha sido enviado');
     })
     .on('failed', function (){
       console.log('Falló el envío del correo');
     });

    emailJob.save(function(err){
      if(err){
        console.log('Error al guardar el trabajo');
      }
    });
}
