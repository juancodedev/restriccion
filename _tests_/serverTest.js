require('babel/register');
//const dbConnection = require('../../modules/connectToDB.js');
const chai = require('chai');

const app = require('../server.js').app;
const request = require('supertest');
chai.should();

describe('Users', function(){

  describe('create', function(){

    it('should register a valid user', function(done){
        const mockUsuarioUno = { email: 'one@gmail.com', notify: true, selloVerde: true, numeroRestriccion: 1 };

        request(app)
        .post('/users')
        .send(mockUsuarioUno)
        .expect(400)
        .end(function(err){
          console.log(err);
          done();
        });
    });

  });

});
