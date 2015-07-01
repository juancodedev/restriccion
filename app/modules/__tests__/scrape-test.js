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
      const mockEmergencia = ['Martes 30 de Junio: sin sello verde 5-6-7-8-9-0-1-2, con sello verde 1-2-3-4', 'Emergencia Ambiental'];
      const mockPreemergencia = ['Lunes 29 de Junio: sin sello verde 9-0-1-2 3-4, con sello verde 1-2', 'Preemergencia Ambiental'];
      const mockAlerta = ['Domingo 28 de Junio: sin sello verde 7-8-9-0, con sello verde sin restriccion', 'Alerta Ambiental'];
      const parseNumerosRestriccion = scrape.parseNumerosRestriccion;

      it('should return expected result', function(){
          const numerosEmergencia    = parseNumerosRestriccion(mockEmergencia);
          const numerosPreemergencia = parseNumerosRestriccion(mockPreemergencia);
          const numerosAlerta        = parseNumerosRestriccion(mockAlerta);

          // Make sure that the day is correct, but we "ignore" the rest,
          // because of parseNumerosRestriccion implementation
          const fechaEmergencia    = new Date((new Date(numerosEmergencia.fecha.getTime())).setDate(30));
          const fechaPreemergencia = new Date((new Date(numerosPreemergencia.fecha.getTime())).setDate(29));
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
                conSello: [1, 2],
                sinSello: [9, 0, 1, 2, 3, 4]
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

            // TODO: agregar test negacion
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


      it('object should have formated numeros', function(){
        parseNumerosRestriccion(mockEmergencia).should.have.deep.property('numeros.conSello').and.be.a('array');
        parseNumerosRestriccion(mockPreemergencia).should.have.deep.property('numeros.conSello').and.be.a('array');
        parseNumerosRestriccion(mockAlerta).should.have.deep.property('numeros.conSello').and.be.a('array');

        parseNumerosRestriccion(mockEmergencia).should.have.deep.property('numeros.sinSello').and.be.a('array');
        parseNumerosRestriccion(mockPreemergencia).should.have.deep.property('numeros.sinSello').and.be.a('array');
        parseNumerosRestriccion(mockAlerta).should.have.deep.property('numeros.sinSello').and.be.a('array');
      });


      it('object should have proper fecha type', function(){
        parseNumerosRestriccion(mockEmergencia).should
                .have.property('fecha')
                .and.be.a('date'); // TODO: revisar el generador de dates, deberia devolver false si no hay fecha

        parseNumerosRestriccion(mockPreemergencia).should
                .have.property('fecha')
                .and.be.a('date');

        parseNumerosRestriccion(mockAlerta).should
                .have.property('fecha')
                .and.be.a('date');



        //Test de negación
        const mockFechaInvalida = ['fechaErronea: sin sello verde 5-6-7-8-9-0-1-2, con sello verde 1-2-3-4', 'Emergencia Ambiental'];



        parseNumerosRestriccion(mockFechaInvalida).should
                .have.property('fecha')
                .and.be.a('date'); // TODO: revisar el generador de dates, deberia devolver false si no hay fecha


      });




      it('object should have proper estatus type', function(){
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
              .then(function (result) { return result; });

      it('finds dom node', function(){
          return scrapeNumerosRestriccion.should.eventually
                  .be.a('array')
                  .and.to.have.length.above(0);
      });
  });

});
