require('babel/register');

require('./app/modules/connectToDB');
const serverConfig = require('./app/config/server');

const path = require('path');
const koa = require('koa');
const route = require('koa-route');
const koaBody = require('koa-body');
const serve = require('koa-static');


/* Controllers */
const index = require('./app/server/index');
const userController = require('./app/controllers/userController');

/* Middleware */
const app = koa();

app.use(koaBody());

app.use(function *(next){
  var start = new Date();
  yield next;
  var ms = new Date() - start;
  console.log('%s : %s %s - %s', this.ip, this.method, this.url, ms);
});

app.use(
  serve(path.join(__dirname, 'app', 'public')));


/* Routes */
app.use(route.get('/', index));
//app.use(route.post('/users', userController.post));
app.use(route.post('/users', userController.create));

/* Listen */
app.listen(serverConfig.port);
console.log(`listening on port ${serverConfig.port}`);
