import API from './api'
import deepstreamClient from 'deepstream.io-client-js'


function createDSClient() {
  (typeof ds !== 'undefined') && ds.close()
  window.ds = deepstreamClient('localhost:3000', {path: '/ds'})
  ds.login()
}
createDSClient()


window._dev = {
  async login(username, password) {
    const res = await API.custom('login').post({username, password})
    createDSClient()
    const user = res.body().data()
    console.log(user)
    return user
  },

  async logout() {
    await API.custom('logout').post()
    createDSClient() // Login 'anon'
  },

  createUser(username, password) {
    return API.custom('create-user').post({username, password})
  },

  async showUser() {
    const res = await API.custom('user').get()
    const user = res.body().data()
    console.log(user)
    return user
  },
}
