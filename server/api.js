import express from 'express'
import passport from 'passport'

import User from './models/User'


const api = express()

// Auth:
api.post('/login', (req, res, next) => {
  passport.authenticate('local-login', (err, user, info) => {
    if(err) {
      res.status(500).end()
      return
    }

    if(!user) {
      res.status(401).json(info)
    } else {
      req.login(user, (err) => {
        if(err) {
          res.status(500).end()
          return
        }

        res.status(200).json(req.user.getData())
      })
    }
  })(req, res, next)
})

api.get('/user', (req, res) => {
  if(req.user) {
    res.status(200).json(req.user.getData())
  } else {
    res.status(401).end()
  }
})

api.all('/logout', (req, res) => {
  req.logout()
  res.json({})
})

api.post('/create-user', async (req, res, next) => {
  console.log(req.body)
  const {username, password} = req.body
  const user = await User.create(username, password)
  res.json(user.getData())
})


export default api
