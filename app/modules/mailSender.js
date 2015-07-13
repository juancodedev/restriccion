import mandrill from 'mandrill-api/mandrill';

const mandrillClient = new mandrill.Mandrill('cIGy-GA91BW6mj574DVK4A');

export function sendEmail(emails){
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
}

/**
 *  Must receive an array of email addresses
 *  [{
       'email': 'slabsuno@mailinator.com',
       'name' : 'slabs',
       'type' : 'to'
   }]


 */
