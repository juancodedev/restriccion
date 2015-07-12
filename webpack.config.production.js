var path = require('path');

module.exports = {
    entry: [
      './app/client/index.jsx'
    ],
    output: {
      path      : path.join(__dirname, 'app', 'public', 'js'),
      filename  : 'bundle.js',
      publicPath: '/'
    },
    module: {
        loaders: [
            {
              test   : /\.jsx?$/,
              exclude: /(node_modules|bower_components)/,
              loaders: ['babel']
            }
        ]
    }
};
