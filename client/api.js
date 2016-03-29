import restful, {fetchBackend} from 'restful.js'
import {assign} from 'lodash'


const _fetch = fetchBackend(fetch)
function _fetchBackend(config) {
  return _fetch(assign({}, config, {credentials: 'include'}))
}

const API = restful('/api', _fetchBackend)

export default API
