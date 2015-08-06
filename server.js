import {__PRODUCTION__, __TEST__} from './app/config/envs';
import serverConfig from './app/config/server';
import path from 'path';
import koa from 'koa';
import route from 'koa-route';
import koaBody from 'koa-body';
import helmet from 'koa-helmet';
import serve from 'koa-static';
import {logRequest} from './app/modules/logger';


/**
 * Controllers
 */
import index from './app/server/index';
import * as userController from './app/controllers/userController';
import * as restrictionDayController from './app/controllers/restrictionDayController';


/**
 * Middleware
 */

/* App */
export const app = koa();

/* Helmet CSPs */
app.use(helmet.xssFilter());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
if(__PRODUCTION__) {
  app.use(helmet.contentSecurityPolicy({
    defaultSrc: ["'self'"],
    scriptSrc : ["'self'", "'unsafe-inline'", "'unsafe-eval'",
                 '*://*.google-analytics.com:*', '*://*.cloudflare.com:*'],
    styleSrc: ["'self'", "'unsafe-inline'", '*://*.cloudflare.com:*'],
    imgSrc  : ["'self'", '*://*.google-analytics.com:*'],
    fontSrc : ["'self'", '*://*.cloudflare.com:*']
  }));
}

/* Koa Body Parser */
app.use(koaBody());

/* Logger */
if (!__TEST__) {
  app.use(function *(next){
    var start = new Date();
    yield next;
    var ms = new Date() - start;
    logRequest.info('%s : %s %s - %s ms', this.ip, this.method, this.url, ms);
  });
}

/* Serve static Assets */
if (!__PRODUCTION__) {
  app.use(
    serve(path.join(__dirname, 'public')));
}


/**
 * Routes
 */

/* Home */
app.use(route.get('/', index));

/* Restriction day */
app.use(route.get('/restriction_day', restrictionDayController.latest));

/* Users */
app.use(route.put('/users', userController.create));
app.use(route.get('/unsubscribe', userController.unsubscribe));


/**
 * Listen
 */
app.listen(serverConfig.port);
console.log(`listening on port ${serverConfig.port}`);
