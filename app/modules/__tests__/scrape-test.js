require('babel/register');
const chai = require('chai');
const scrape = require('../scrape.js');
chai.use(require('chai-as-promised'));
chai.should();


describe('scrape', function(){
  describe('#fetchNumerosRestriccion', function(){
    // Fetch Numeros Restriccion only once
    var fetchNumerosRestriccion =
          scrape.fetchNumerosRestriccion
            .then( function (result) { console.log(result); return result; } );

    it('should return an object', function(){
      return fetchNumerosRestriccion.should.eventually.be.an('object');
    });

    it('object should have formated numeros', function(){
      return fetchNumerosRestriccion.should.eventually.have.deep.property('numeros.conSello') &&
            fetchNumerosRestriccion.should.eventually.have.deep.property('numeros.sinSello');
    });

    it('object should have proper fecha type', function(){
      return fetchNumerosRestriccion.should.eventually
              .have.property('fecha')
              .and.to.match(/\d{1,2}-\d{1,2}-\d{4}/);
    });

  });
});
