import {__PRODUCTION__} from '../config/envs';
import {host} from '../config/redis';

let config;

if (__PRODUCTION__) {
  config = {
    redis: {
      host: host
    }
  };
} else {
  config = {};
}

export default config;
