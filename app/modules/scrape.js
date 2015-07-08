import request from 'request';
import cheerio from 'cheerio';
import {compose, map, filter, trim, split} from 'ramda';

/**
 * Fetches numerosRestriccion from web page and parses the data
 * @return {promise}
 */
export function fetchNumerosRestriccion(){
    return scrapeNumerosRestriccion.then(parseNumerosRestriccion);
}


/**
 * Parses scraped data and returns a formatted object
 * @param  {array} jsonArray scrapeNumerosRestriccion scraped data
 * @return {object}
 */
export function parseNumerosRestriccion(jsonArray) {
    const parseNumbers =
            compose(
              filter(Number.isInteger),
              map(parseInt));

    const fechaRegex = /.*\b(\d{1,2}) de .*:.*/;

    let sinSello = jsonArray[0].replace(/^.*sin sello verde (\d[\d- ]*)(,.*)?$/, '$1');
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
        conSello: conSello ? conSello : []
      }
    };
}


/**
 * Scrapes the website and resolves with an array
 * @return {promise}
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

    const filterElements = compose(
      map(trim),
      split('\n'),
      trim
    );

    const numerosRestriccion = filterElements($('.col-sm-12.restrictiontop > *').text());

    console.log(numerosRestriccion);

    resolve(numerosRestriccion);
  });
});


/**
 * Returns a Date with current time and specified day
 * @param  {string} day the day to set in Date
 * @return {date}
 */
function getDate(day){
  var date = new Date();
  date.setDate(day);
  return date;
}
