require('./app/modules/connectToDB.js');

const path = require('path');
const route = require('koa-route');
const koa = require('koa');
const hbs = require('koa-hbs');
const serve = require('koa-static');


/* Controllers */
const home = require('./app/controllers/home');


/* Middleware */
const app = koa();

app.use(
  serve(path.join(__dirname, 'app', 'public')));

app.use(hbs.middleware({
  viewPath: path.join(__dirname, 'app', 'views')
}));


/* Routes */
app.use(route.get('/', home));
//app.use(route.post('/users', userController.post));


/* Listen */
app.listen(3000);
console.log('listening on port 3000');
