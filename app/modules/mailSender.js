import mandrill from 'mandrill-api/mandrill';
import moment from 'moment';
import {log} from '../modules/logger';
import {__MANDRILL_KEY__} from '../config/mandrill';
import {__ADMIN_EMAIL__} from '../config/admin';
import {project} from 'ramda';


const mandrillClient = new mandrill.Mandrill(__MANDRILL_KEY__);
moment.locale('es');


/**
 * Sends Restriction Notification Emails to Users
 * @param  {array}   users an array of Users
 * @param  {object}  info with the latest scraped data
 * @return {promise}
 */
export function sendRestrictionEmail(users, info){
  return new Promise((resolve, reject) => {

    const emails = project(['email'], users);

    const mergeVars = users.map(em => {
      return {
        rcpt: em.email,
        vars: [
          { name: 'EMAIL', content: em.email},
          { name: 'TOKEN', content: em.token}
        ]
      };
    });

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
      'template_name'   : 'tengoRestriccion',
      'template_content': templateContent,
      'message'         : message
    }, result => {
      log.info({'mailSender#sendRestrictionEmail': { result }});
      resolve(result);
    }, error => {
      log.error({'mailSender#sendRestrictionEmail': { error }});
      reject(error);
    });
  });
}


/**
 * Sends Welcome Email to User
 * @param  {object}   user User Data
 * @return {promise}
 */
export function sendWelcomeEmail(user) {
  return new Promise((resolve, reject) => {

    const email = {email: user.email};

    const mergeVars = [{
      rcpt: user.email,
      vars: [
        { name: 'EMAIL', content: user.email},
        { name: 'TOKEN', content: user.token}
      ]
    }];


    const message = {
      'inline_css': true,
      'to'        : [email],
      'merge'     : true,
      'merge_vars': mergeVars
    };

    mandrillClient.messages.sendTemplate({
      'template_name'   : 'tengorestricci-n-bienvenida',
      'template_content': '',
      'message'         : message
    }, result => {
      log.info({'mailSender#sendRestrictionEmail': { result }});
      resolve(result);
    }, error => {
      log.error({'mailSender#sendRestrictionEmail': { error }});
      reject(error);
    });
  });
}


/**
 * Sends Log Email to Admin
 * @param  {object}  logJson
 * @return {promise}
 */
export function sendLogEmail(title, logJson) {
  return new Promise((resolve, reject) => {
    const prettyLog = JSON.stringify(logJson, null, 4);

    const message = {
      'html'      : prettyLog,
      'text'      : prettyLog,
      'subject'   : `[LOG] ${title}`,
      'from_email': 'logger@tengorestriccion.cl',
      'to'        : [
        {
          'email': __ADMIN_EMAIL__,
          'type' : 'to'
        }
      ]
    };

    mandrillClient.messages.send({
      'message': message
    }, result => {
      log.info({'mailSender#sendLogEmail': { result }});
      resolve(result);
    }, error => {
      log.error({'mailSender#sendLogEmail': { error }});
      reject(error);
    });
  });
}
