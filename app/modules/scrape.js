import request from 'request';
import cheerio from 'cheerio';
import {__RESTRICTIONDATA_URL__} from '../config/scraping';
import {log} from '../modules/logger';
import {compose, map, filter, trim, split, replace, test, ifElse, always} from 'ramda';


/**
 * Fetches numerosRestriccion from web page and parses the data
 * @return {promise}
 */
export function fetchNumerosRestriccion(){
    return scrapeNumerosRestriccion()
            .catch( error => {
              log.error({'scrape#fetchNumerosRestriccion': {
                message: `Error while scraping ${__RESTRICTIONDATA_URL__}`,
                error
              }});
            })
            .then(parseNumerosRestriccion);
}


/**
 * Parses scraped data and returns a formatted object
 * @param  {array} jsonArray scrapeNumerosRestriccion scraped data
 * @return {object}
 */
export function parseNumerosRestriccion(jsonArray) {
  const getNumbers =
          compose(
            filter(Number.isInteger),
            map(parseInt));

  const parseNumbers =
          compose(
            getNumbers,
            split('-'),
            replace(/ /g, '-'),
            trim());

  const conSelloRegex = replace(/.*, con sello verde(.*)/, '$1');
  const sinSelloRegex = replace(/^.*sin sello verde (\d[\d- ]*)(,.*)?$/, '$1');
  const fechaRegex = /.*\b(\d{1,2}) de .*:.*/;
  const parseSinSello = compose(parseNumbers, sinSelloRegex);

  const parseConSello =
    ifElse(test(/^.*, con sello verde (.*)$/),
      compose(parseNumbers, conSelloRegex), always([]));


  //TODO: ocupar ifElse para sacar la fecha o tirar el error
  if(!(fechaRegex.test(jsonArray[0]))) {
    throw Error("Couldn't get 'fecha' while scraping");
  }

  const day = jsonArray[0].replace(fechaRegex, '$1');


  return {
    fecha  : getDate(day),
    estatus: jsonArray[1],
    numeros: {
      sinSello: parseSinSello(jsonArray[0]),
      conSello: parseConSello(jsonArray[0])
    }
  };
}


/**
 * Scrapes the website and resolves with an array
 * @return {promise}
 */
export function scrapeNumerosRestriccion(){
  return new Promise(function(resolve, reject){
    request.get({
      url: __RESTRICTIONDATA_URL__
    }, (error, response, html) => {
      if(error || !(response.statusCode === 200) ) {
        error = error || response;
        reject(error);
      }

      response.setEncoding('utf-8');

      const $ = cheerio.load(html.toString());

      const filterElements =
              compose(
                map(trim),
                split('\n'),
                trim);

      resolve( filterElements($('.col-sm-12.restrictiontop > *').text()) );
    });
  });
}


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
