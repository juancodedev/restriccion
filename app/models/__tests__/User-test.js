require('babel/register');
const dbConnection = require('../../modules/connectToDB.js');
const chai = require('chai');
const User = require('../User.js');
chai.use(require('chai-as-promised'));
chai.should();


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

  describe('#create', function(){

    after(function(done){
      dbConnection.db.dropDatabase(function(){
        dbConnection.close();
        done();
      });
    });

    it('should create the user sent in the query', function(done){
      User.create(mockUsuarioBueno)
        .then(function(user){
          user.should.have.property('email', 'email@gmail.com');
          user.should.have.property('notify', true);
          user.should.have.property('selloVerde', true);
          user.should.have.property('numeroRestriccion', 1);
          done();
        });
    });

    it('should throw an error', function(){
      return User.create(mockUsuarioMalo)
        .should.be.rejectedWith(/ValidationError/);
    });
  });

  describe('#allWithRestriction', function(){

    after(function(done){
      dbConnection.db.dropDatabase(function(){
        dbConnection.close();
        done();
      });
    });

    //TODO: probar allWithRestriction
    // crear 4 usuarios validos con diferentes numeros y sellos
    // asegurarse que allWithRestriction devuelve los usuarios correctos
  });
});
