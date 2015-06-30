import request from 'request';
import cheerio from 'cheerio';
import getDate from './dateFormat';


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


    $('.col-sm-12.restrictiontop').find("h3,a").each(function(){
      var obj = $(this);
      jsonArray.push(obj.html().trim());
    });

    let sinSello = jsonArray[0].replace(/.*sin sello verde(.*),.*/, '$1');
    sinSello = sinSello.trim().replace(/ /g, '-');
    sinSello = sinSello.split('-');

    let conSello = /^.*, con sello verde (.*)$/.test(jsonArray[0]) ?
        jsonArray[0].replace(/.*, con sello verde(.*)/, '$1') : false;

    if(conSello){
      conSello = conSello.trim().replace(/ /g, '-');
      conSello = conSello.split('-');
    }



    /**
    if(jsonArray[3].indexOf('Sin restricci&#xF3;n') === -1) {
        conSello = jsonArray[3];
    }**/

    //console.log(jsonArray[0]);


    const output = {
      fecha  : getDate(jsonArray[0]),
      estatus: jsonArray[1],
      numeros: {
        sinSello: sinSello,
        conSello: conSello
      }
    };

    resolve(output);
  });
});
