require('babel/register');
const chai = require('chai');
const app = require('../server.js').app;
const request = require('supertest');
chai.should();

describe('Users', function(){

  describe('create', function(){

    it('should register a valid user', function(done){
      const mockUsuarioValido = { email: 'one@gmail.com', notify: true, selloVerde: true, numeroRestriccion: 1 };

      request(app.listen())
      .post('/users')
      .send(mockUsuarioValido)
      .expect(201)
      .end(done);
    });

    it('should not register an invalid user', function(done){
      const mockUsuarioInvalido = { email: 'oneil.com', notify: true, selloVerde: true, numeroRestriccion: 1 };

      request(app.listen())
      .post('/users')
      .send(mockUsuarioInvalido)
      .expect(409)
      .end(done);
    });
  });

});
