import request from 'request';
import cheerio from 'cheerio';
import moment from 'moment';


export const fetchNumerosRestriccion = new Promise(function(resolve, reject) {

  request.get({
    url: 'http://www.uoct.cl/restriccion-vehicular/'
  }, function (error, response, html) {
    response.setEncoding('utf-8');

    if(error || !(response.statusCode === 200) ) {
      reject(console.error("Error al scrapear los numeros con restriccion!"));
    }

    const $ = cheerio.load(html.toString());
    let jsonArray = [];
    let conSello = false;

    $('.alerta-ambiental').each(function(){
      var obj = $(this);
      jsonArray.push(obj.html().trim());
    });

    $('div.restriction h3').each(function(){
      var obj = $(this);
      jsonArray.push(obj.html().trim());
    });

    /*
    if(jsonArray[3].indexOf('Sin restricci&#xF3;n') === -1) {
      conSello = true;
    }
    */

    const output = {
      fecha  : moment().format('DD-MM-YYYY'),
      estatus: jsonArray[1],
      numeros: {
        sinSello: jsonArray[2],
        conSello: conSello
      }
    };

    resolve(output);
  });
});
