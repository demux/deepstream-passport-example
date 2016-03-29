import connectRedis from 'connect-redis'
import expressSession from 'express-session'


export const RedisStore = connectRedis(expressSession)

const session = expressSession({
  store: new RedisStore(),
  secret: '60dd06aa-cf8e-4cf8-8925-6de720015ebf',  // Change this!
  resave: false,
  saveUninitialized: false,
  name: 'sid',
  cookie: {
    secure: false,
  },
})


export default session
