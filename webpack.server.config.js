const path = require('path');
const webpack = require('webpack');
const DotEnv = require('dotenv-webpack');
module.exports = {
  mode: 'none',
  entry: {
    server: './src/server.ts'
  },
  target: 'node',
  resolve: { extensions: ['.js', '.ts'] },
  optimization: {
    minimize: false
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module:{
    noParse: /polyfills-.*\.js/,
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    new DotEnv(),
    new webpack.ContextReplacementPlugin(
        // fixes WARNING Critical dependency: the request of a dependency is an expression
        /(.+)?express(\\|\/)(.+)?/,
        path.join(__dirname, 'src'),
        {}
    )  
  ]
};
