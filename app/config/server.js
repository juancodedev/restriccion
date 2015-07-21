const server = {
  test       : {port: 1234},
  development: {port: 3000, webpackPort: 3030},
  production : {port: 8000},
  prod       : {port: 8000}
};

export default server[process.env.NODE_ENV] ? server[process.env.NODE_ENV] : server.development;
