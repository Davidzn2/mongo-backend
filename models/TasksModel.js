const mongoose = require('mongoose');

// DEFINIR LA ESTRUCTURA DE LOS DOCUMENTOS NOSQL // O DE LAS FILAS // SQL
// PRIMSA
const taskSchema = mongoose.Schema({
    title: {
        type: String,
        default: "Task",
        required: true
    },
    content: {
        type: String
    },
    author: {
        type: String
    },
    done: {
        type: Boolean,
        default: false,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true,
    }    
})

const Task = mongoose.model("Task", taskSchema)
module.exports = Task
