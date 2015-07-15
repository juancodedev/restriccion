import bunyan from 'bunyan';

export const logRequest =
  bunyan.createLogger({
    name: 'AppRequests'
  });

export const log =
  bunyan.createLogger({
    name: 'AppLog'
  });
