require('babel/register');
const chai = require('chai');
const scrape = require('../scrape.js');
chai.use(require('chai-as-promised'));
chai.use(require('chai-things'));
chai.should();


describe('scrape', function(){
  describe('#fetchNumerosRestriccion', function(){
    // Fetch Numeros Restriccion only once
    var fetchNumerosRestriccion =
          scrape.fetchNumerosRestriccion
            .then( function (numeros) { return numeros; } );

    it('should return an array of objects', function(){
      return fetchNumerosRestriccion.should.eventually.be.an('array');
    });

    it('objects in array should be formatted', function(){
      return fetchNumerosRestriccion.should.eventually
              .all.have.property('fecha')
              .and.all.have.property('estatus')
              .and.all.have.property('numeros');
    });

    it('objects in array should have formated numeros', function(){
      return fetchNumerosRestriccion.should.eventually
              .all.have.deep.property('numeros.conSello')
              .and.all.have.deep.property('numeros.sinSello');
    });

  });
});
