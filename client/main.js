import API from './api'
import deepstreamClient from 'deepstream.io-client-js'

window.ds = deepstreamClient('localhost:3000', {path: '/ds'})

ds.login()

window._dev = {
  login(username, password) {
    return API.custom('login').post({username, password}).then((res) => {
      const user = res.body().data()
      return user
    })
  },

  logout() {
    return API.custom('logout').post()
  },

  createUser(username, password) {
    return API.custom('create-user').post({username, password})
  },

  async showUser() {
    const res = await API.custom('user').get().then()
    const user = res.body().data()
    console.log(user)
  },
}
