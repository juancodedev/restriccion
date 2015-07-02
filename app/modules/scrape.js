import request from 'request';
import cheerio from 'cheerio';
import {compose, map, filter} from 'ramda';

/**
 * Fetches numerosRestriccion from web page and parses it
 * @return {object} promise
 */
export function fetchNumerosRestriccion(){
    return scrapeNumerosRestriccion.then(parseNumerosRestriccion);
}


/**
 * Parses the array given as parameter and returns and object
 * @param  {array} jsonArray is the array resolved from the scrapeNumerosRestriccion promise
 * @return {object} final formated object
 */
export function parseNumerosRestriccion(jsonArray) {
    const parseNumbers =
            compose(
              filter(Number.isInteger),
              map(parseInt));

    const fechaRegex = /.*\b(\d{1,2}) de .*:.*/;

    let sinSello = jsonArray[0].replace(/.*sin sello verde(.*),.*/, '$1');
    sinSello = sinSello.trim().replace(/ /g, '-');
    sinSello = sinSello.split('-');
    sinSello = parseNumbers(sinSello);

    let conSello = /^.*, con sello verde (.*)$/.test(jsonArray[0]) ?
        jsonArray[0].replace(/.*, con sello verde(.*)/, '$1') : false;

    if(conSello){
      conSello = conSello.trim().replace(/ /g, '-');
      conSello = conSello.split('-');
      conSello = parseNumbers(conSello);
    }

    if(!(fechaRegex.test(jsonArray[0]))) {
      throw Error("Couldn't get 'fecha' while scraping");
    }

    const day = jsonArray[0].replace(fechaRegex, '$1');

    return {
      fecha  : getDate(day),
      estatus: jsonArray[1],
      numeros: {
        sinSello: sinSello,
        conSello: conSello
      }
    };
}

/**
 * Scrapes the website and resolves with an array of all the objects it gets
 * @param {function} contains the resolve and reject arguments to be called when the promise ends
 */
export const scrapeNumerosRestriccion = new Promise(function(resolve, reject){
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

    resolve(jsonArray);
  });
});

/**
 * Receives a string with a number
 * @param  {string} day is the number sent by parseNumerosRestriccion
 * @return {date} date object with the date formated using the day passed as argument
 */
function getDate(day){
  var date = new Date();
  date.setDate(day);
  return date;
}
