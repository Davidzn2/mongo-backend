const express = require('express');
const controllers = require('../controllers')
const router = express.Router();

// destructuracion
const { UserController } = controllers


router.get('/', UserController.findAll);
router.post('/', UserController.create)

module.exports = router;
