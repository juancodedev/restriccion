import mandrill from 'mandrill-api/mandrill';
import moment from 'moment';
import {log} from '../modules/logger';
import {__MANDRILL_KEY__} from '../config/mandrill';


const mandrillClient = new mandrill.Mandrill(__MANDRILL_KEY__);
moment.locale('es');

/**
 * Sends Restriction Notification Emails to Users
 * @param  {array}    users array
 * @param  {object}   object with the latest scraped data
 * @param  {function} callback
 */
export function sendEmail(users, info, done){


  const emails = users.map(user => user.email);

  const mergeVars = users.map(em => {
    return {
      rcpt: em.email,
      vars: [
        { name: 'EMAIL', content: em.email},
        { name: 'TOKEN', conteng: em.token}
      ]
    };
  });


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
      'content': moment(info.fecha).format('dddd DD MMMM YYYY')
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
    }
  ];

  mandrillClient.messages.sendTemplate({
    'template_name'   : templateName,
    'template_content': templateContent,
    'message'         : message
  }, result => {
    log.info({'mailSender#sendEmail': { result }});
  }, error => {
    log.error({'mailSender#sendEmail': { error }});
  });

  done();
}
