const { Task } = require("../models")

module.exports = {
    findAll: async (req, res) => {
        const tasks = await Task.find()
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
        await Task.updateOne({ id }, req.body)
        const UpdatedTask = await Task.findById(id)
        return res.status(200).json(UpdatedTask)
    },
    borrar: async (req, res) => { 
        const { id } = req.params;
        console.log(id)
        const taskToDelete = Task.findByIdAndDelete(id)
        return res.status(200).json(taskToDelete)
    }
}