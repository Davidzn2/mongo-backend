const express = require('express');
const controllers = require('../controllers')
const router = express.Router();

// destructuracion
const { UserController } = controllers

// 

  "/users"
  router.get('/', UserController.findAll);
  router.post('/', UserController.create);
  
  // estamos enviando data por el body
  router.post('/login', UserController.login)

module.exports = router;
