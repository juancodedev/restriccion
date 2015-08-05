var path = require('path');

module.exports = {
  entry: [
    './app/client/index.jsx'
  ],
  output: {
    path      : path.join(__dirname, 'public', 'js'),
    filename  : 'client.js',
    publicPath: '/'
  },
  module: {
    noParse: [/moment.js/],
    loaders: [
      {
        test   : /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel']
      }
    ]
  }
};
