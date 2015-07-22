import mandrill from 'mandrill-api/mandrill';
import kue from 'kue';
import {splitEvery} from 'ramda';
const jobs = kue.createQueue();
const mandrillClient = new mandrill.Mandrill('cIGy-GA91BW6mj574DVK4A');

jobs.process('new_email', function (job, done){
  console.log('JOB: ' + JSON.stringify(job));
  sendEmail(job.data.emails, done);
});


/**
 * sendEmails
 * @param  {array} emailArray is the array sent to be divided
 *
 */
export function sendEmails(emailArray) {
  const divideUsers = splitEvery(150);
  const newArray = divideUsers(emailArray);

  newArray.forEach(em => {
    var emails = em.map(i => {
      var obj = {};
      obj.email = i;
      obj.name = '';
      obj.type = 'to';
      return obj;
    });

    addEmailToQueue(emails);
  });
}

/**
 * Adds an email Job to the queue
 * @param  {array} email array with the recipient data
 * @return {promise}
 */
export function addEmailToQueue(emails){
    const emailJob = jobs.create('new_email', {
      emails
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


/**
 * Sends the email to the address received as parameter
 * @param  {array}   email array with the recipient data
 * @param  {Function} done  callback from the job process
 * @return {none}
 */
export function sendEmail(emails, done){
  console.log('ENVIANDO CORREO A: ' + JSON.stringify(emails));

  const templateName = 'tengoRestriccion';
  const message = {
    'inline_css': true,
    'to'        : emails
  };

  const templateContent = [
    {
      'name'   : 'fecha',
      'content': 'test fecha'
    },
    {
      'name'   : 'estatus',
      'content': 'test estatus'
    },
    {
      'name'   : 'conSello',
      'content': 'test de números con sello'
    },
    {
      'name'   : 'sinSello',
      'content': 'test de números sin sello'
    }
  ];

  mandrillClient.messages.sendTemplate({
    'template_name'   : templateName,
    'template_content': templateContent,
    'message'         : message
  }, function(result){
    console.log('RESULT: ' + JSON.stringify(result));
  }, function(err){
    console.log('ERROR: ' + JSON.stringify(err));
  });

  done();
}
