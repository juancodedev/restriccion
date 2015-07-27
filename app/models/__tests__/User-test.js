import {cleanUpAfterEach} from '../../utils/testDbHelper.js';
import chai from 'chai';
import * as User from '../User.js';
chai.use(require('chai-things'));
chai.use(require('chai-as-promised'));
chai.should();


describe('User', () => {
  cleanUpAfterEach(User.model);

  const usuarioBueno = {
    email            : 'email@gmail.com',
    notify           : true,
    selloVerde       : true,
    numeroRestriccion: 1
  };

  const usuarioMalo = {
    email            : 'invalidEmail',
    notify           : 'invalidBooleanType',
    selloVerde       : 'invalidBooleanType',
    numeroRestriccion: '0'
  };

  describe('create', () => {

    it('should create the user sent in the query',  done => {
      User.create(usuarioBueno)
        .then(function(user){
          user.should.have.property('email', 'email@gmail.com');
          user.should.have.property('notify', true);
          user.should.have.property('selloVerde', true);
          user.should.have.property('numeroRestriccion', 1);
          done();
        });
    });

    it('should fail on same email create', () => {
      return User.create(usuarioBueno)
        .then(() => {
          return User.create(usuarioBueno);
        })
        .should.eventually.be.rejectedWith(/duplicate key error/);
    });

    it('should throw an error', () => {
      return User.create(usuarioMalo)
        .should.be.rejectedWith(/validation failed/);
    });
  });

  describe('allWithRestriction', () => {
    const usuarioUno = { email: 'one@gmail.com', notify: true, selloVerde: true, numeroRestriccion: 1 };
    const usuarioDos = { email: 'two@gmail.com', notify: true, selloVerde: true, numeroRestriccion: 3 };
    const usuarioTres = { email: 'three@gmail.com', notify: true, selloVerde: false, numeroRestriccion: 9 };
    const usuarioCuatro = { email: 'four@gmail.com', notify: true, selloVerde: false, numeroRestriccion: 2 };

    const numbersUno = {
      conSello: [],
      sinSello: [9, 0, 1, 2]
    };

    const numbersDos = {
      conSello: [1, 3],
      sinSello: [8, 9, 0, 1]
    };

    it('returns an array with the restricted users',  done => {

      Promise.all([User.create(usuarioUno),
      User.create(usuarioDos),
      User.create(usuarioTres),
      User.create(usuarioCuatro)])
      .then(() => {
        const t1 = User.allWithRestriction(numbersUno)
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

        const t2 = User.allWithRestriction(numbersDos)
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

        Promise.all([t1, t2]).then(() => {
          done();
        }).catch(done);
      });
    });
  });


  describe('unSubscribe', () => {
    const usuario = { email: 'one@gmail.com', notify: true, selloVerde: true, numeroRestriccion: 1 };

    it('should un-subscribe the User', () => {
      return User.create(usuario)
        .then(() => {
          return User.unSubscribe('one@gmail.com')
                  .should.eventually.have.property('nModified', 1);
        });
    });


    it('should throw if User doesn\'t exist', () => {
      return User.create(usuario)
        .then(() => {
          return User.unSubscribe('two@gmail.com')
                  .should.eventually.be.rejectedWith(/Error/);
        });
    });
  });
});
