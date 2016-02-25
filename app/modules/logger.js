import {__PRODUCTION__, __TEST__} from '../config/envs';
import bunyan from 'bunyan';
import path from 'path';

function logLevel(level = 'info') {
  if (__TEST__) {
    return 'fatal';
  }
  return level;
}

function streamType(file) {
  if (__PRODUCTION__) {
    if (!file) { throw Error('Must specify a Valid Filename on production'); }

    return [{
      type  : 'rotating-file',
      path  : path.join(__dirname, '..', '..', 'log', file),
      period: '1d',
      count : 180
    }];
  }

  return [{
    stream: process.stderr
  }];
}

export const logRequest =
  bunyan.createLogger({
    name   : 'AppRequests',
    level  : logLevel(),
    streams: streamType('requests.log')
  });

export const log =
  bunyan.createLogger({
    name   : 'AppLog',
    level  : logLevel(),
    streams: streamType('app.log')
  });
