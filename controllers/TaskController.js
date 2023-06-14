const { Task } = require("../models")
// boilerplate
// CRUD
module.exports = {
    findAll: async (req, res) => {
        const tasks = await Task.find({ email: "asdasdasd" })
        console.log("🚀 ~ file: TaskController.js:6 ~ findAll: ~ tasks:", tasks)
        return res.status(200).json(tasks)
    },
    findOneById: async (req, res) => {
        const { id } = req.params;
        const task = await Task.findById(id)
        return res.status(200).json(task)
    },
    create: async (req, res) => {
        console.log({ ...req.body })
        const newTask = new Task({ ...req.body })
        const insertedTask = await newTask.save()
        return res.status(201).json(insertedTask)
    },
    update: async (req, res) => {
        const { id } = req.params;
        console.log(req.body)
        await Task.updateOne({ _id: id }, req.body) // mongoss => 
        const UpdatedTask = await Task.findById(id)
        return res.status(200).json(UpdatedTask)
    },
    borrar: async (req, res) => {
        // eliminacion total ☢️☢️☢️
        const { id } = req.params;
        console.log(id)
        const taskToDelete = Task.findByIdAndDelete(id)
        // success 200
        return res.status(200).json(taskToDelete)
    },
    logicDelete: async (req, res) => {
        // estructura de control try catch
        try {
        // eliminacion logica
        const { id } = req.params
        console.log(id)
        await Task.updateOne({ _id: id }, { isActive: false })
        const task = await Task.findById(id)
        console.log(task)
        return res.status(200).json(task)

        } catch(error) {
            console.log(error)
            // 
            return res.status(400).json({ message: 'error' })
        }

    }
}