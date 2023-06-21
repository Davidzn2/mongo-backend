const mongoose = require('mongoose')

const bcrypt = require('bcrypt')
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true 
  },
  password: {
    type: String,
    require: true
  },
  avatar: {
    type: String,
  }
}, {
  timestamps: true
})

// middleware
// encripar la contraseña
// 
UserSchema.pre('save', function(next){
  // this => informacion del documento que estamos consultado
  // next => 
  const user = this
  const SALT = 10

  // early return javascript
  if(!user.isModified('password')) return next()

  return bcrypt.hash(user.password, SALT, function(err, has){
    if (err) {
      return next()
    }

    user.password = has
    return next()
  })
})

const User = mongoose.model("User", UserSchema)
module.exports = User