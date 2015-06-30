import request from 'request';
import cheerio from 'cheerio';
import getDate from './dateFormat';


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

    $('.col-sm-12.restrictiontop').find("h3,a").each(function(){
      var obj = $(this);
      console.log(obj.html());
      jsonArray.push(obj.html().trim());
    });


    $('div.restriction h3').each(function(){
      var obj = $(this);
      //console.log(obj.html());
      jsonArray.push(obj.html().trim());
    });

    let conSello = false;


    if(jsonArray[3].indexOf('Sin restricci&#xF3;n') === -1) {
        conSello = jsonArray[3];
    }


    const output = {
      fecha :  getDate(jsonArray[0]),
      estatus : jsonArray[1],
      numeros : {
        sin_sello : jsonArray[2],
        con_sello: conSello
      }
    };


    resolve(output);
  });
});
