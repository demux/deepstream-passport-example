import Deepstream from 'deepstream.io'
import RethinkDBStorageConnector from 'deepstream.io-storage-rethinkdb'


const ds = new Deepstream()

ds.set('urlPath', '/ds')

ds.set('storage', new RethinkDBStorageConnector({
  port: 28015,
  host: 'localhost',
  database: 'deepstream_passport_example',
}))

export default ds
