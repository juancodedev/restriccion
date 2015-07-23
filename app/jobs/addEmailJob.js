import kue from 'kue';
import {splitEvery} from 'ramda';
import {sendEmail} from '../modules/mailSender';
const jobs = kue.createQueue();


jobs.process('new_email', function (job, done){
  sendEmail(job.data.emails, job.data.info, done);
});


/**
 * prepareEmails
 * @param  {array} emailArray is the array sent to be divided
 *
 */
export function prepareEmails(emailArray, info) {
  const divideUsers = splitEvery(150);
  const newArray = divideUsers(emailArray);

  //Add emails to Queue
  newArray.forEach(em => {
    addEmailToQueue(em, info);
  });
}


/**
 * Adds an email Job to the queue
 * @param  {array} email array with the recipient data
 * @return {promise}
 */
export function addEmailToQueue(emails, info){
  console.log('working...');
    const emailJob = jobs.create('new_email', {
      emails,
      info
    })
      //priority of the job
      .priority('high')
      //Attempts if the job fails
      .attempts(5)
      //Delay before another attempt when failed
      .backoff({delay: 30000, type: 'fixed'})
      //time to remain active before it is set to failed
      .ttl(10000);

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
