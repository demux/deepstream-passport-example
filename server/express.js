import path from 'path'

import express from 'express'
import passport from 'passport'
import bodyParser from 'body-parser'

import './auth'
import session from './session'
import api from './api'


export const app = express()

// app.get('*', (req, res, next) => {
//   console.log(req.cookies)

//   next()
// })

app.use(bodyParser.json())

app.use(session)

app.use(passport.initialize())
app.use(passport.session())

app.use('/api', api)

const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackDevConfig = require('../webpack.config.development')

app.use(webpackMiddleware(webpack(webpackDevConfig), {
  publicPath: '/',
  contentBase: path.join(__dirname, '../client'),
  inline: true,
  hot: true,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  },
  historyApiFallback: true,
}))

app.use(express.static(path.join(__dirname, '../client')))
