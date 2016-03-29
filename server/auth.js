import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'
import slug from 'slug'

import {User, thinky} from './models'


// Local login:
passport.use('local-login', new LocalStrategy({
  passReqToCallback: true
}, (req, username, password, done) => {
  User.getByUsername(slug(username, {lower: true})).then((user) => {
    if(user.validPassword(password)) {
      done(null, user)

      // Bypass the model, to not trigger the `lastModified` field:
      thinky.r.table('User').get(user.id).update({
        lastLogin: new Date()
      }).run()
    } else {
      done(null, false, {message: 'Invalid Password'})
    }
  }).catch(thinky.Errors.DocumentNotFound, () => {
    done(null, false, {message: 'User does not exist'})
  })
}))

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.get(id).then((user) => {
    done(null, user)
  })
})
