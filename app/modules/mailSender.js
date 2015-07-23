import mandrill from 'mandrill-api/mandrill';
import {__MANDRILL_KEY__} from '../config/mandrill';
const mandrillClient = new mandrill.Mandrill(__MANDRILL_KEY__);


/**
 * Sends the email to the address received as parameter
 * @param  {array}   email array with the recipient data
 * @param  {Function} done  callback from the job process
 * @return {none}
 */
export function sendEmail(emails, info, done){

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
