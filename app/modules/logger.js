import bunyan from 'bunyan';

function logLevel(level = 'info') {
  if (process.env.NODE_ENV === 'test') {
    return 'fatal';
  }
  return level;
}

export const logRequest =
  bunyan.createLogger({
    name : 'AppRequests',
    level: logLevel()
  });

export const log =
  bunyan.createLogger({
    name : 'AppLog',
    level: logLevel()
  });
