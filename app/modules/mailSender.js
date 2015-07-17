import mandrill from 'mandrill-api/mandrill';
import kue from 'kue';

const jobs = kue.createQueue();
const mandrillClient = new mandrill.Mandrill('cIGy-GA91BW6mj574DVK4A');

jobs.process('new_email', function (job, done){
  console.log('JOB: ' + JSON.stringify(job));
  sendEmail(job.data.email, done);
});


/**
 * Adds an email Job to the queue
 * @param  {array} email array with the recipient data
 * @return {promise}
 */
export function addEmailToQueue(email){
  return new Promise(function(resolve, reject){
    const emailJob = jobs.create('new_email', {
      email
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
       resolve();
     })
     .on('failed', function (){
       console.log('Falló el envío del correo');
       reject();
     });

    emailJob.save(function(err){
      if(err){
        reject();
      }
    });
  });
}


/**
 * Sends the email to the address received as parameter
 * @param  {array}   email array with the recipient data
 * @param  {Function} done  callback from the job process
 * @return {none}
 */
export function sendEmail(email, done){
  const templateName = 'tengoRestriccion';
  const message = {
    'inline_css': true,
    'to'        : email
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
