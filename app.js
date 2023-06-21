const express = require('express');
const mongoose = require('mongoose')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config()

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const tasksRouter = require('./routes/taskRoutes');
const petsRotuer = require('./routes/pets');

const app = express();


// middlewares
app.use(logger('dev'));
app.use(express.json()); // body.req
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // mas avanzado
app.use(express.static(path.join(__dirname, 'public')));

// PRINCIPIO
const mongoConnect = async ()=>{
    try{
        await mongoose.connect(            
            // WINDOWS 
            process.env.MONGO_URL
        )
        console.log('Connected to mongo' + 'on port ' + process.env.PORT)
    }
    catch(err){
        console.log(err)
        process.exit(1)
    }
}

// aqui podemos usar versionado de metodos
// /api/v1/
app.use('/', indexRouter); // cargamos el html
app.use('/users', usersRouter); // los metodos de usuario
app.use('/tasks', tasksRouter); // los metodos de tareas
app.use('/pets', petsRotuer)

mongoConnect()


module.exports = app;
