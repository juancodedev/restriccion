import serverConfig from './app/config/server';
import path from 'path';
import koa from 'koa';
import route from 'koa-route';
import koaBody from 'koa-body';
import serve from 'koa-static';
import {logRequest} from './app/modules/logger';
import {startScraping} from './app/modules/startScrapeJobs';

/**
 * starts the scraping jobs
 */
startScraping(0);

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

/* Koa Body Parser */
app.use(koaBody());

/* Logger */
if (process.env.NODE_ENV !== 'test') {
  app.use(function *(next){
    var start = new Date();
    yield next;
    var ms = new Date() - start;
    logRequest.info('%s : %s %s - %s ms', this.ip, this.method, this.url, ms);
  });
}

/* Serve static Assets */
if (process.env.NODE_ENV !== 'production') {
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
  app.use(route.post('/users', userController.create));


/**
 * Listen
 */
app.listen(serverConfig.port);
console.log(`listening on port ${serverConfig.port}`);
