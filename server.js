import serverConfig from './app/config/server';
import path from 'path';
import koa from 'koa';
import route from 'koa-route';
import koaBody from 'koa-body';
import serve from 'koa-static';


/* Controllers */
import index from './app/server/index';
import * as userController from './app/controllers/userController';

/* Middleware */
export const app = koa();

app.use(koaBody());

if (process.env.NODE_ENV !== 'test') {
  app.use(function *(next){
    var start = new Date();
    yield next;
    var ms = new Date() - start;
    console.log('%s : %s %s - %s', this.ip, this.method, this.url, ms);
  });
}

app.use(
  serve(path.join(__dirname, 'app', 'public')));


/* Routes */
app.use(route.get('/', index));
//app.use(route.post('/users', userController.post));
app.use(route.post('/users', userController.create));

/* Listen */
app.listen(serverConfig.port);
console.log(`listening on port ${serverConfig.port}`);
