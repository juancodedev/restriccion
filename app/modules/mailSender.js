import mandrill from 'mandrill-api/mandrill';

const mandrillClient = new mandrill.Mandrill('cIGy-GA91BW6mj574DVK4A');
const templateName = "tengoRestriccion";
const message = {
  "inline_css": true,
  "to"        : [{
    "email": "nicolas@santiagolab.cl",
    "name" : "Nicolas Fernandez",
    "type" : "to"
  }]
};

const templateContent = [
  {
    "name"   : "fecha",
    "content": "test fecha"
  },
  {
    "name"   : "estatus",
    "content": "test estatus"
  },
  {
    "name"   : "conSello",
    "content": "test de números con sello"
  },
  {
    "name"   : "sinSello",
    "content": "test de números sin sello"
  }
];

mandrillClient.messages.sendTemplate({
  "template_name"   : templateName,
  "template_content": templateContent,
  "message"         : message
}, function(result){
  console.log('RESULT: ' + JSON.stringify(result));
}, function(err){
  console.log('ERROR: ' + JSON.stringify(err));
});
