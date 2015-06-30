require('babel/register');
const chai = require('chai');
const scrape = require('../scrape.js');
chai.use(require('chai-as-promised'));
chai.should();


describe('scrape', function(){
  describe('#fetchNumerosRestriccion', function(){
    // TODO: Tests de integracion
  });


  describe('#parseNumerosRestriccion', function(){
      var mockConSello = ['Martes 30 de Junio: sin sello verde 9-0-1-2 3-4, con sello verde 1-2', 'Preemergencia Ambiental'];
      var mockSinSello = ['Martes 30 de Junio: sin sello verde 9-0-1-2 3-4, con sello verde sin restriccion', 'Alerta Ambiental'];
      var parseNumerosRestriccion = scrape.parseNumerosRestriccion;

      it('should return an object', function(){
        parseNumerosRestriccion(mockConSello).should.be.a('object');
        parseNumerosRestriccion(mockSinSello).should.be.a('object');
      });

      it('object should have formated numeros and be an array', function(){
        parseNumerosRestriccion(mockConSello).should.have.deep.property('numeros.conSello').and.be.a('array');
        parseNumerosRestriccion(mockSinSello).should.have.deep.property('numeros.conSello').and.be.a('array');

        parseNumerosRestriccion(mockConSello).should.have.deep.property('numeros.sinSello').and.be.a('array');
        parseNumerosRestriccion(mockSinSello).should.have.deep.property('numeros.sinSello').and.be.a('array');
      });

      it('object should have proper fecha type', function(){
        parseNumerosRestriccion(mockConSello).should
                .have.property('fecha')
                .and.be.a('date'); // TODO: revisar el generador de dates, deberia devolver false si no hay fecha

        parseNumerosRestriccion(mockSinSello).should
                .have.property('fecha')
                .and.be.a('date');
      });

      it('object should have proper estatus type', function(){
        parseNumerosRestriccion(mockConSello).should
                .have.property('estatus')
                .and.to.match(/ambiental/i);

        parseNumerosRestriccion(mockSinSello).should
                .have.property('estatus')
                .and.to.match(/ambiental/i);
      });
  });


  describe('#scrapeNumerosRestriccion', function(){
      var scrapeNumerosRestriccion =
            scrape.scrapeNumerosRestriccion
              .then(function (result) { return result; });

      it('finds dom node', function(){
          return scrapeNumerosRestriccion.should.eventually
                  .be.a('array')
                  .and.to.have.length.above(0);
      });
  });

});
