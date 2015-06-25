import request from 'request';
import cheerio from 'cheerio';


export const numerosRestriccion = new Promise(function(resolve, reject) {

  request.get({
    url: 'http://www.uoct.cl/restriccion-vehicular/'
  }, function (error, response, html) {
    response.setEncoding('utf-8');

    if(error || !(response.statusCode === 200) ) {
      reject(console.error("Error al scrapear los numeros con restriccion!"));
    }

    const $ = cheerio.load(html.toString());
    let jsonArray = [];

    $('.alerta-ambiental').each(function(){
      var obj = $(this);
      jsonArray.push(obj.html());
    });


    $('div.restriction h3').each(function(){
      var obj = $(this);
      jsonArray.push(obj.html());
    });

    $('div.restriction h4').each(function(){
      var obj = $(this);
      jsonArray.push(obj.html());
    });

    const output =
      jsonArray
        .reduce(function(o, v, i) {
          o[i] = v;
          return o;
        }, {});

    resolve(output);
  });
});
