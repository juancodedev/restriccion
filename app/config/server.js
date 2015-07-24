import {__ENVIRONMENT__} from '../config/envs';

const server = {
  test       : {port: 1234},
  development: {port: 3000, webpackPort: 3030},
  production : {port: 8080}
};

export default server[__ENVIRONMENT__];
