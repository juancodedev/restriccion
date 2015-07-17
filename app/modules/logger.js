import bunyan from 'bunyan';
import path from 'path';

function logLevel(level = 'info') {
  if (process.env.NODE_ENV === 'test') {
    return 'fatal';
  }
  return level;
}

function streamType(file) {
  if (process.env.NODE_ENV === 'production') {
    if (!file) { throw Error('Must specify a Valid Filename on production'); }

    return [{
      type  : 'rotating-file',
      path  : path.join(__dirname, 'log', file),
      period: '1d',
      count : 15
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
    streams: streamType()
  });

export const log =
  bunyan.createLogger({
    name   : 'AppLog',
    level  : logLevel(),
    streams: streamType('app.log')
  });
