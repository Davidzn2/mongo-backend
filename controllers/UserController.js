const { User } = require('../models/')
const { comparePasword, createToken } = require('../utils')
// SERVIDOR API REST
// EXPRESS + NODEJS + MONGO
// JWT
// Bcrypt // has

// busar por id, buscar por correo 
module.exports = {
  create: async (req, res) => {
    try {
      console.log({ ...req.body })
      const newUser = new User({ ...req.body })
      const insertedUser = await newUser.save()
      return res.status(201).json(insertedUser)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: 'error al crear el usuario'})
    }
  },
  findAll: async (req, res) => {
    try {
      // 
      const users = await User.aggregate().project({ name: 1, email: 1 })
      console.log("🚀 ~ file: TaskController.js:6 ~ findAll: ~ tasks:", users)      
      // await for of      
      // const cleanPassword = users.map(user => {
      //   const { _doc } = user
      //   // spread Operator ...
      //   // mongo aggration
      //   const { password, _id, ...restOfData } = _doc                
      //   return restOfData
      // })
      return res.status(200).json(users)
    } catch (error) {
      console.log("🚀 ~ file: UserController.js:34 ~ findAll: ~ error:", error)
      return res.status(400).json({ message: 'error on findAll user' })
    }
  },  
  login: async (req, res) => {
    const { email, password: passwordReq } = req.body
    try {            
      // paso 1 - valida que exista
      const isUserExist = await User.find({ email })      
      // length es una propiedad de los arreglos
      if (isUserExist.length === 0) {
        return res.status(400).json({ message: 'error on login' })
      }
      // paso 2 - validar email y el password ✅
      const isValid = comparePasword(isUserExist[0].password, passwordReq)      
      
      if(!isValid){
        return res.status(400).json({ message: 'error on login' })
      }
      // 
      // paso 3 - crear el token JWT //   
      const [user] = isUserExist            
      const token = createToken(user)
            
      return res.status(200).json({ message: token })
    } catch (error) {
      console.log("🚀 ~ file: UserController.js:34 ~ findAll: ~ error:", error)
      return res.status(400).json({ message: 'error on login' })
    } 
  },  
}


// // destructuracion de arrelgos
// const [isUserExist, valor2] = [
//   {    
//     name: 'Abril',
//     email: 'abril@gmail.com',
//     password: '$2b$10$Hc.BWw4/L2Xr21rJlyevnuBxRIw00LfT8YDh.E8G44r8CyZLs1qIO',    
//   },
//   {
//     hola: "amigos"
//   },
// ]

// // un JR
// console.log(isUserExist.password)
// console.log(valor2)

// const frutas = ["uva", "manzana", "platano"]
// const [uv, mz, plat] = frutas
// console.log(mz)
