const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  comparePasword: (passwordBD, passwordReq) => {
    const match = bcrypt.compareSync(passwordReq, passwordBD)        
    return match    
  },
  createToken: (userPayload) => {
    // body, user, contrato    
    const payload = {
      _id: userPayload._id.toString(),
      name: userPayload.name,
      email: userPayload.email,
      exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1hora
    }    

    try {      
      const token = jwt.sign(payload, process.env.SECRET)
      return token

    } catch(error) {
      console.log(error)
      return error
    }
  }
}