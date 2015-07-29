import {__ENVIRONMENT__} from '../config/envs';

const redis = {
  test       : {host: '127.0.0.1'},
  development: {host: '127.0.0.1'},
  production : {host: 'redis'}
};

export default redis[__ENVIRONMENT__];
