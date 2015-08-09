import {__ENVIRONMENT__} from '../config/envs';

const db = {
  test       : {db: 'mongodb://localhost/tengo-restriccion-test'},
  development: {db: 'mongodb://localhost/tengo-restriccion-dev'},
  production : {db: 'mongodb://localhost/tengo-restriccion'}
};

export default db[__ENVIRONMENT__];
