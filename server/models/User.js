import thinky from './thinky'
import bcrypt from 'bcrypt-nodejs'
import slug from 'slug'

const type = thinky.type


export const userSchema = {
  id: type.string(),
  createdAt: type.date().default(thinky.r.now()),
  modifiedAt: type.date(),
  lastLogin: type.date(),
  username: type.string(),
  password: type.string(),
  profile: {
    name: type.string()
  },
  isAdmin: type.boolean().default(false),
}

const User = thinky.createModel('User', userSchema)


User.pre('save', function(next) {
  this.modifiedAt = thinky.r.now()

  // Normalise username:
  this.username = slug(this.username, {lower: true})

  next()
})

User.ensureIndex('id')
User.ensureIndex('createdAt')
User.ensureIndex('modifiedAt')
User.ensureIndex('username')

User.define('getData', function() {
  return {
    id: this.id,
    createdAt: this.createdAt,
    modifiedAt: this.modifiedAt,
    username: this.username,
    profile: this.profile
  }
})

User.define('validPassword', function(password) {
  return bcrypt.compareSync(password, this.password)
})

User.defineStatic('generateHash', function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
})

User.defineStatic('getByUsername', function(username) {
  return this.getAll(username, {index: 'username'}).nth(0).default(null)
})

User.defineStatic('create', function(username, password, profile={}) {
  const user = new User({
    username,
    password: User.generateHash(password),
    profile
  })

  return user.save()
})

export default User
