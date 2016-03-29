import http from 'http'
import Promise from 'bluebird'

import {app} from './express'
import ds from './deepstream'


const server = http.createServer(app)

ds.set('httpServer', server)
ds.start()

const host = 'localhost'
const port = 3000

server.listenAsync = Promise.promisify(server.listen, {context: server})
server.listenAsync(port, host).then(() => {
  console.log('🌎 ' + `Listening on http://${host}:${port}`)
})
