var request = require('request');
var cheerio = require('cheerio');


request.get({
  url:'http://www.uoct.cl/restriccion-vehicular/',
}, function (error, response, html) {
  response.setEncoding('utf-8');
  if (!error && response.statusCode == 200) {
    //console.log(html);
    var $ = cheerio.load(html.toString());
    var jsonArray = [];

    $('.alerta-ambiental').each(function(i, element){
        var obj = $(this);
        jsonArray.push(obj.html());
    });


    $('div.restriction h3').each(function(i,element){
        var obj = $(this);
        jsonArray.push(obj.html());
    });

    $('div.restriction h4').each(function(i,element){
        var obj = $(this);
        jsonArray.push(obj.html());
    });

    var json = jsonArray.reduce(function(o, v, i) {
      o[i] = v;
      return o;
    }, {});

  }
});
