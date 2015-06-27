var email = require('mandrill-send')('cIGy-GA91BW6mj574DVK4A');

email({
  from : 'Federico Hernández <federicohernandez.ve@gmail.com>',
  to: ['federicohernandez.ve@gmail.com'],
  subject: 'Tengo Restricción?',
  text:'Correo de prueba'
}, function(err){
  if (err) console.error(err);
});
