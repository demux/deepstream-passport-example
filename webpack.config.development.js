'use strict'

var webpack = require('webpack')
var config = require('./webpack.config.base.js')

config.entry = [
  'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
].concat(config.entry)

config.devtool = 'cheap-module-eval-source-map'

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin()
])

config.module.loaders = config.module.loaders.concat([
  {test: /\.js?$/, loaders: ['babel'], exclude: /node_modules/}
])

module.exports = config
