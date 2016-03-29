import path from 'path'

import express from 'express'
import passport from 'passport'

import './auth'
import session from './session'
import api from './api'


export const app = express()

app.use(passport.initialize())
app.use(passport.session())

app.use(session)

app.use('/api', api)

app.use(express.static(path.join(__dirname, '../client')))

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../public/index.html'))
// })
