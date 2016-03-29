import Promise from 'bluebird'
import passport from 'passport'
import Deepstream from 'deepstream.io'
import RethinkDBStorageConnector from 'deepstream.io-storage-rethinkdb'
import MockExpressRequest from 'mock-express-request'
import MockExpressResponse from 'mock-express-response'

import session from './session'


const ds = new Deepstream()

ds.set('urlPath', '/ds')

ds.set('storage', new RethinkDBStorageConnector({
  port: 28015,
  host: 'localhost',
  database: 'deepstream_passport_example',
}))

ds.set('permissionHandler', {
  async isValidUser(connectionData, authData, callback) {
    let req = new MockExpressRequest({
      method: 'GET',
      url: '/ds',
      headers: {
        Cookie: connectionData.headers.cookie
      }
    })

    let res = new MockExpressResponse({
      request: req
    })

    function use(fn) {
      return new Promise((resolve, reject) => {
        fn(req, res, (err) => err ? reject(err) : resolve())
      })
    }

    await use(session)
    await use(passport.initialize())
    await use(passport.session())

    console.log('req.user', req.user)

    if(req.user) {
      callback(null, req.user.id)
    } else {
      callback(null, 'anon')
    }
  },

  canPerformAction(id, message, callback) {
    callback(null, true)
  },
})

export default ds
