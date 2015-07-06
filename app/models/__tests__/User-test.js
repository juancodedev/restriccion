require('babel/register');
require('../../modules/connectToDB.js');
const chai = require('chai');
const User = require('../User.js');
chai.use(require('chai-as-promised'));
chai.should();
//npm install mocha-mongoose?????????
//TODO: probar allWithRestriction
/*
User.create({
  email            : '1@gris.cl',
  selloVerde       : false,
  numeroRestriccion: 1
});
*/

describe('User', function(){
      const mockUsuarioBueno = {
        email            : 'email@gmail.com',
        notify           : true,
        selloVerde       : true,
        numeroRestriccion: 1
      };

      const mockUsuarioMalo = {
        email            : 'invalidEmail',
        notify           : 'invalidBooleanType',
        selloVerde       : 'invalidBooleanType',
        numeroRestriccion: '0'
      };

      describe('create', function(){

          after(function(){

          });

          it('should create the user sent in the query', function(done){
            User.create(mockUsuarioBueno).then(function(x){
              x.should.have.property('email', 'email@gmail.com');
              x.should.have.property('notify',true);
              x.should.have.property('selloVerde',true);
              x.should.have.property('numeroRestriccion',1);
              //console.log(x);

              done();
            });
          });

          it('should throw an error', function(){
             User.create(mockUsuarioMalo);
          });
      });


});
