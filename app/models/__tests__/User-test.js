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

          result.forEach(function(item){
            item.should.satisfy(function(i){
              return i.email === 'three@gmail.com' || i.email === 'four@gmail.com';
            });

            item.should.satisfy(function(i){
              return i.selloVerde === false;
            });

            item.should.satisfy(function(i){
              return i.numeroRestriccion === 2 || i.numeroRestriccion === 9;
            });
          });
        });

        const t2 = User.allWithRestriction(mockNumbersDos)
          .then(function(result){
            result.should.be.an('array');
            result.should.all.have.property('email');
            result.should.all.have.property('notify');
            result.should.all.have.property('selloVerde');
            result.should.all.have.property('numeroRestriccion');

            result.forEach(function(item){
              item.should.satisfy(function(i){
                return i.email === 'one@gmail.com' || i.email === 'two@gmail.com' || i.email === 'three@gmail.com';
              });

              item.should.satisfy(function(i){
                return i.selloVerde === false || i.selloVerde === true;
              });

              item.should.satisfy(function(i){
                return i.numeroRestriccion === 1 || i.numeroRestriccion === 3 || i.numeroRestriccion === 9;
              });
            });
          });

        Promise.all([t1, t2]).then(done).catch(done);
    });
  });
});
