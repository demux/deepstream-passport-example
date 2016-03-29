"use strict"

const path = require('path')
const webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV

const env = {
  production: NODE_ENV === 'production',
  staging: NODE_ENV === 'staging',
  test: NODE_ENV === 'test',
  development: NODE_ENV === 'development' || typeof NODE_ENV === 'undefined'
}

Object.assign(env, {
  build: (env.production || env.staging)
})

module.exports = {
  target: 'web',

  entry: [
    'babel-polyfill',
    './client/main.js'
  ],

  output: {
    path: path.join(__dirname, 'client'),
    pathInfo: true,
    publicPath: 'http://localhost:3000/',
    filename: 'main.js'
  },

  resolve: {
    root: path.join(__dirname, ''),
    modulesDirectories: [
      'web_modules',
      'node_modules',
      'client'
    ],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: env.development,
      __STAGING__: env.staging,
      __PRODUCTION__: env.production,
      __CURRENT_ENV__: '\'' + (NODE_ENV) + '\''
    })
  ],

  module: {
    loaders: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
    }, {
      test: /\.scss$/,
      loader: 'style!css!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded'
    }],

    noParse: /\.min\.js/
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty'
  }
}