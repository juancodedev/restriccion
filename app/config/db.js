const db = {
  test       : {db: 'mongodb://localhost/tengo-restriccion-test'},
  development: {db: 'mongodb://localhost/tengo-restriccion-dev'},
  production : {db: 'mongodb://mongodb/tengo-restriccion'},
  prod       : {db: 'mongodb://mongodb/tengo-restriccion'}
};

export default db[process.env.NODE_ENV] ? db[process.env.NODE_ENV] : db.development;
