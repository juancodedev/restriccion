require("babel/register");

require('./app/modules/connectToDB');
const serverConfig = require('./app/config/server');

const path = require('path');
const koa = require('koa');
const route = require('koa-route');
const serve = require('koa-static');
const views = require('koa-views');


/* Controllers */
const index = require('./app/server/index');


/* Middleware */
const app = koa();

app.use(function *(next){
  var start = new Date();
  yield next;
  var ms = new Date() - start;
  console.log('%s %s - %s', this.method, this.url, ms);
});

app.use(
  serve(path.join(__dirname, 'app', 'public')));

app.use(
  views(path.join(__dirname, 'app', 'views'), {
    map: {
      html: 'underscore'
    }
}));


/* Routes */
app.use(route.get('/', index));
//app.use(route.post('/users', userController.post));


/* Listen */
app.listen(serverConfig.port);
console.log(`listening on port ${serverConfig.port}`);
