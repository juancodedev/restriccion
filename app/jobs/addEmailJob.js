import kue from 'kue';
import {splitEvery} from 'ramda';
import {sendEmail} from '../modules/mailSender';
import {host} from '../config/redis';

const jobs = kue.createQueue({
  redis: {
    host: host
  }
});

/**
 * description of the job process
 * @param  {string} 'new_email' is the name of the job to be processed
 * @param  {function} function where the job is processed
 */
jobs.process('new_email', function (job, done){
  sendEmail(job.data.emails, job.data.info, done);
});


/**
 * Entry point for Email Jobs.
 * @param  {array} userArray is the array of all users with restriction
 * @param  {object} info is the object with the latest scraped data
 */
export function setEmailJob(userArray, info){
  const newArray = divideEmails(userArray);
  //Add emails to Queue
  newArray.forEach(em => {
    addEmailToQueue(em, info);
  });

}


/**
 * divideEmails
 * @param  {array} userArray is the array sent to be divided
 * @param  {object} info is the object with the latest scraped data
 */
export function divideEmails(userArray) {
  const divideUsers = splitEvery(150);
  const newArray = divideUsers(userArray);

  return newArray;
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
