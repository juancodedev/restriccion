require('babel/register');
const chai = require('chai');
const scrape = require('../scrape.js');
chai.use(require('chai-as-promised'));
chai.should();


describe('scrape', function(){
  describe('#parseNumerosRestriccion', function(){
      const mockEmergencia = [
        'Martes 30 de Junio: sin sello verde 5-6-7-8-9-0-1-2, con sello verde 1-2-3-4',
        'Emergencia Ambiental'];

      const mockPreemergencia = [
        'Viernes 3 de Julio: sin sello verde 1-2-3-4 -9-0, con sello verde 7-8',
        'Preemergencia Ambiental'];

      const mockAlerta = [
        'Domingo 28 de Junio: sin sello verde 7-8-9-0, con sello verde sin restriccion',
        'Alerta Ambiental'];

      const parseNumerosRestriccion = scrape.parseNumerosRestriccion;

      it('should return expected result', function(){
          const numerosEmergencia    = parseNumerosRestriccion(mockEmergencia);
          const numerosPreemergencia = parseNumerosRestriccion(mockPreemergencia);
          const numerosAlerta        = parseNumerosRestriccion(mockAlerta);

          // Make sure that the day is correct, but we "ignore" the rest,
          // because of parseNumerosRestriccion implementation
          const fechaEmergencia    = new Date((new Date(numerosEmergencia.fecha.getTime())).setDate(30));
          const fechaPreemergencia = new Date((new Date(numerosPreemergencia.fecha.getTime())).setDate(3));
          const fechaAlerta        = new Date((new Date(numerosAlerta.fecha.getTime())).setDate(28));

          numerosEmergencia
            .should.be.deep.equal({
              fecha  : fechaEmergencia,
              estatus: "Emergencia Ambiental",
              numeros: {
                conSello: [1, 2, 3, 4],
                sinSello: [5, 6, 7, 8, 9, 0, 1, 2]
              }
            });

          numerosPreemergencia
            .should.be.deep.equal({
              fecha  : fechaPreemergencia,
              estatus: "Preemergencia Ambiental",
              numeros: {
                conSello: [7, 8],
                sinSello: [1, 2, 3, 4, 9, 0]
              }
            });

          numerosAlerta
            .should.be.deep.equal({
              fecha  : fechaAlerta,
              estatus: "Alerta Ambiental",
              numeros: {
                conSello: [],
                sinSello: [7, 8, 9, 0]
              }
            });

            numerosEmergencia
              .should.not.be.deep.equal({
                fecha  : fechaEmergencia,
                estatus: "Emergtal",
                numeros: {
                  conSello: [1, 1, 1],
                  sinSello: [2, 9, 4, 2]
                }
              });

              numerosPreemergencia
                .should.not.be.deep.equal({
                  fecha  : fechaPreemergencia,
                  estatus: "Prial",
                  numeros: {
                    conSello: [],
                    sinSello: [8, 8]
                  }
                });

              numerosAlerta
                .should.not.be.deep.equal({
                  fecha  : fechaAlerta,
                  estatus: "Alertal",
                  numeros: {
                    conSello: [3, 3],
                    sinSello: [9, 9, 9]
                  }
                });
      });


      it('object should have formated "numeros"', function(){
        parseNumerosRestriccion(mockEmergencia)
            .should.have.deep.property('numeros.conSello')
            .and.be.a('array');

        parseNumerosRestriccion(mockPreemergencia)
            .should.have.deep.property('numeros.conSello')
            .and.be.a('array');

        parseNumerosRestriccion(mockAlerta)
            .should.have.deep.property('numeros.conSello')
            .and.be.a('array');

        parseNumerosRestriccion(mockEmergencia)
            .should.have.deep.property('numeros.sinSello')
            .and.be.a('array');

        parseNumerosRestriccion(mockPreemergencia)
            .should.have.deep.property('numeros.sinSello')
            .and.be.a('array');

        parseNumerosRestriccion(mockAlerta)
            .should.have.deep.property('numeros.sinSello')
            .and.be.a('array');
      });


      it('object should have proper "fecha" type', function(){
        const mockFechaInvalida =
                ['fechaErronea: sin sello verde 5-6-7-8-9-0-1-2, con sello verde 1-2-3-4', 'Emergencia Ambiental'];

        parseNumerosRestriccion(mockEmergencia).should
                .have.property('fecha')
                .and.be.a('date');

        parseNumerosRestriccion(mockPreemergencia).should
                .have.property('fecha')
                .and.be.a('date');

        parseNumerosRestriccion(mockAlerta).should
                .have.property('fecha')
                .and.be.a('date');

        (function(){ parseNumerosRestriccion(mockFechaInvalida); })
                          .should.throw(/Couldn't get 'fecha' while scraping/);
      });


      it('object should have proper "estatus" type', function(){
        parseNumerosRestriccion(mockEmergencia).should
                .have.property('estatus')
                .and.to.match(/ambiental/i);

        parseNumerosRestriccion(mockPreemergencia).should
                .have.property('estatus')
                .and.to.match(/ambiental/i);

        parseNumerosRestriccion(mockAlerta).should
                .have.property('estatus')
                .and.to.match(/ambiental/i);
      });
  });


  describe('#scrapeNumerosRestriccion', function(){
      var scrapeNumerosRestriccion =
        scrape.scrapeNumerosRestriccion
          .then(function(x){ return x; });


      it('finds dom node', function(){
          return scrapeNumerosRestriccion.should.eventually
                  .be.a('array')
                  .and.to.have.length.above(0);
      });

      it('returns expected "fecha/numeros" text pattern', function(){
        return scrapeNumerosRestriccion.should.eventually
                .have.property(0)
                .and.to.match(/.*\b(\d{1,2}) de .*: sin sello verde \d-.*\d, con sello verde \d-.*\d/i);

      });

      it('returns expected "estatus" text pattern', function(){
        return scrapeNumerosRestriccion.should.eventually
                .have.property(1)
                .and.to.match(/.* ambiental/i);
      });
  });
});
