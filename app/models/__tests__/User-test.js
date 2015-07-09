require('babel/register');
const dbConnection = require('../../modules/connectToDB.js');
const chai = require('chai');
const User = require('../User.js');
chai.use(require('chai-things'));
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
    const mockUsuarioUno = { email: 'one@gmail.com', notify: true, selloVerde: true, numeroRestriccion: 1 };
    const mockUsuarioDos = { email: 'two@gmail.com', notify: true, selloVerde: true, numeroRestriccion: 3 };
    const mockUsuarioTres = { email: 'three@gmail.com', notify: true, selloVerde: false, numeroRestriccion: 9 };
    const mockUsuarioCuatro = { email: 'four@gmail.com', notify: true, selloVerde: false, numeroRestriccion: 2 };

    const mockNumbersUno = {
      conSello: [],
      sinSello: [9, 0, 1, 2]
    };

    const mockNumbersDos = {
      conSello: [1, 3],
      sinSello: [8, 9, 0, 1]
    };

    after(function(done){
      dbConnection.db.dropDatabase(function(){
        done();
      });
    });

    before(function(done){
      Promise.all([User.create(mockUsuarioUno),
      User.create(mockUsuarioDos),
      User.create(mockUsuarioTres),
      User.create(mockUsuarioCuatro)])
      .then(function(){
        done();
      });
    });

    it('returns an array with the restricted users', function(done){
      const t1 = User.allWithRestriction(mockNumbersUno)
        .then(function(result){
          result.should.be.an('array');
          result.should.all.have.property('email');
          result.should.all.have.property('notify');
          result.should.all.have.property('selloVerde');
          result.should.all.have.property('numeroRestriccion');


          result.should.contain.a.thing.with.property('email', 'three@gmail.com');
          result.should.contain.a.thing.with.property('email', 'four@gmail.com');

          result.should.not.contain.a.thing.with.property('email', 'one@gmail.com');
          result.should.not.contain.a.thing.with.property('email', 'two@gmail.com');

        });

        const t2 = User.allWithRestriction(mockNumbersDos)
          .then(function(result){
            result.should.be.an('array');
            result.should.all.have.property('email');
            result.should.all.have.property('notify');
            result.should.all.have.property('selloVerde');
            result.should.all.have.property('numeroRestriccion');

            result.should.contain.a.thing.with.property('email', 'one@gmail.com');
            result.should.contain.a.thing.with.property('email', 'two@gmail.com');
            result.should.contain.a.thing.with.property('email', 'three@gmail.com');

            result.should.not.contain.a.thing.with.property('email', 'four@gmail.com');
          });

        Promise.all([t1, t2]).then(function(){
          done();
        }).catch(done);
    });
  });

  describe('#unSubscribe', function(){
    const mockUsuario = { email: 'one@gmail.com', notify: true, selloVerde: true, numeroRestriccion: 1 };

    after(function(done){
      dbConnection.db.dropDatabase(function(){
        done();
      });
    });

    before(function(done){
      User.create(mockUsuario)
      .then(function(){
        done();
      });
    });

    it('should return the status with nModified 1', function(done){
        const mail = 'one@gmail.com';

        const t1 = User.unSubscribe(mail)
        .then(function(user){
          user.should.have.property('nModified', 1);
        });

        Promise.all([t1]).then(function(){
          done();
        }).catch(done);
    });

    it('should throw an Error', function(){
      const mailDos = 'two@gmail.com';

      return User.unSubscribe(mailDos)
      .should.be.rejectedWith(/Error/);

      /**
      const mailDos = 'two@gmail.com';

      const t1 = User.unSubscribe(mailDos)
      .then(function(){
        done();
      });

      Promise.all([t1]).then(function(){
        done();
      }).catch(function(user){
        console.log('UHHHHHH: ' + user);
        user.should.be.rejectedWith(/Error/);
        done();
      });
        **/
    });
  });
});
