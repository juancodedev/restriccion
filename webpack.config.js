var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry  : [
      'webpack-dev-server/client?http://0.0.0.0:3030',
      'webpack/hot/only-dev-server',
      './app/client/index.jsx'
    ],
    output: {
      path      : __dirname,
      filename  : 'js/client.js',
      publicPath: 'http://0.0.0.0:3030/'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
              test   : /\.jsx?$/,
              exclude: /(node_modules|bower_components)/,
              loaders: ['react-hot', 'babel']
            }, {
              test   : /\.json$/,
              loader : 'json',
              include: path.join(__dirname, 'src')
            }
        ]
    }
};
