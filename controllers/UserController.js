const { User } = require('../models/')

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
      const tasks = await User.find()
      console.log("🚀 ~ file: TaskController.js:6 ~ findAll: ~ tasks:", tasks)
      return res.status(200).json(tasks)
    } catch (error) {
      return res.status(400).json({ message: 'error on findAll user' })
    }
},
  findByEmail: async (req, res) => {
    const { email } = req.params
    const user = await User.find({ email })  
    // password 
    return res.status(200).json(user)
  },
}
