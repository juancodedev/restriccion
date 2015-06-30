require('babel/register');
const chai = require('chai');
const scrape = require('../scrape.js');
chai.use(require('chai-as-promised'));
chai.should();


describe('scrape', function(){
  /**
  describe('#fetchNumerosRestriccion', function(){
    // Fetch Numeros Restriccion only once
    var fetchNumerosRestriccion =
          scrape.fetchNumerosRestriccion()
            .then( function (result) { return result; } );

    it('should return an object', function(){
      return fetchNumerosRestriccion.should.eventually.be.an('object');
    });

    it('object should have formated numeros', function(){
      return fetchNumerosRestriccion.should.eventually.have.deep.property('numeros.conSello').and.be.an('array');
    });

    it('object should have formated numeros', function(){
      return fetchNumerosRestriccion.should.eventually.have.deep.property('numeros.conSello').and.be.an('array');
    });

    it('object should have proper fecha type', function(){
      return fetchNumerosRestriccion.should.eventually
              .have.property('fecha')
              .and.to.match(/^\d{1,2}-\d{1,2}-\d{4}$/);
    });

    it('object should have proper estatus type', function(){
      return fetchNumerosRestriccion.should.eventually
              .have.property('estatus')
              .and.to.match(/ambiental/i);
    });
  });
  **/

  describe('#parseNumerosRestriccion', function(){
      var mockIdeal = ['Martes 30 de Junio: sin sello verde 9-0-1-2 3-4, con sello verde 1-2', 'Preemergencia Ambiental'];
      var parseNumerosRestriccionIdeal =
            scrape.parseNumerosRestriccion(mockIdeal);

      var mockNoIdeal = ['Martes 30 de Junio: sin sello verde 9-0-1-2 3-4, con sello verde sin restricción', 'Preemergencia Ambiental'];
      var parseNumerosRestriccionNoIdeal =
            scrape.parseNumerosRestriccion(mockNoIdeal);



      //Tests con mockIdeal

      it('should return an object', function(){
          return parseNumerosRestriccionIdeal.should.be.an('object');
      });

      it('object should have formated numeros and be an array', function(){
        return parseNumerosRestriccionIdeal.should.have.deep.property('numeros.sinSello').and.be.an('array');
      });

      it('object should have formated numeros and be an array', function(){
        return parseNumerosRestriccionIdeal.should.have.deep.property('numeros.conSello').and.be.an('array');
      });

      it('object should have proper fecha type', function(){
        return parseNumerosRestriccionIdeal.should
                .have.property('fecha')
                .and.be.an('date');
      });

      it('object should have proper estatus type', function(){
        return parseNumerosRestriccionIdeal.should
                .have.property('estatus')
                .and.to.match(/ambiental/i);
      });


      //Tests con mockNoIdeal

      it('should return an object', function(){
          return parseNumerosRestriccionNoIdeal.should.be.an('object');
      });

      it('object should have formated numeros and be an array', function(){
        return parseNumerosRestriccionNoIdeal.should.have.deep.property('numeros.sinSello').and.be.an('array');
      });

      it('object should have formated numeros and be an array', function(){
        return parseNumerosRestriccionNoIdeal.should.have.deep.property('numeros.conSello').and.be.an('array');
      });

      it('object should have proper fecha type', function(){
        return parseNumerosRestriccionNoIdeal.should
                .have.property('fecha')
                .and.be.an('date');
      });

      it('object should have proper estatus type', function(){
        return parseNumerosRestriccionNoIdeal.should
                .have.property('estatus')
                .and.to.match(/ambiental/i);
      });

  });

  /**
  describe('#scrapeNumerosRestriccion', function(){
      var scrapeNumerosRestriccion =
            scrape.scrapeNumerosRestriccion
              .then(function (result) { return result; });

      it('finds dom node', function(){
          return scrapeNumerosRestriccion.should.eventually.be.an('array').and.to.have.length.above(0);
      });
  });
  **/


});
