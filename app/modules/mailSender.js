import mandrill from 'mandrill-api/mandrill';
import kue from 'kue';
import {splitEvery} from 'ramda';
const jobs = kue.createQueue();
const mandrillClient = new mandrill.Mandrill('cIGy-GA91BW6mj574DVK4A');

jobs.process('new_email', function (job, done){
  //console.log('JOB: ' + JSON.stringify(job));
  sendEmail(job.data.emails, job.data.info, done);
});


/**
 * sendEmails
 * @param  {array} emailArray is the array sent to be divided
 *
 */
export function sendEmails(emailArray, info) {
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
    addEmailToQueue(emails, info); //change to emails instead of em in production
  });
}

/**
 * Adds an email Job to the queue
 * @param  {array} email array with the recipient data
 * @return {promise}
 */
export function addEmailToQueue(emails, info){
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


/**
 * Sends the email to the address received as parameter
 * @param  {array}   email array with the recipient data
 * @param  {Function} done  callback from the job process
 * @return {none}
 */
export function sendEmail(emails, info, done){
  //console.log('INFO: ' + JSON.stringify(info));

  var mergeVars = [];

  emails.forEach(em => {
    var obj = {};
    obj.rcpt = em.email;
    obj.vars = [];
    var param1 = {};
    param1.name = 'EMAIL';
    param1.content = em.email;
    var param2 = {};
    param2.name = 'TOKEN';
    param2.content = em.token;
    obj.vars.push(param1);
    obj.vars.push(param2);
    mergeVars.push(obj);
  });

  //console.log(JSON.stringify(mergeVars));


  const templateName = 'tengoRestriccion';
  const message = {
    'inline_css': true,
    'to'        : emails,
    'merge'     : true,
    'merge_vars': mergeVars
  };

  const templateContent = [
    {
      'name'   : 'fecha',
      'content': info.fecha
    },
    {
      'name'   : 'estatus',
      'content': info.estatus
    },
    {
      'name'   : 'conSello',
      'content': (info.numeros.conSello.length > 0) ? info.numeros.conSello.join('-') : 'Sin restricción'
    },
    {
      'name'   : 'sinSello',
      'content': info.numeros.sinSello.join('-')
    },
    {
      'name'   : 'CLIENT_NAME',
      'content': 'www.youtube.com'
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
