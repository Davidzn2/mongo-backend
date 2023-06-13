const express = require('express');
const controllers = require('../controllers')

const router = express.Router();

/* GET users listing. */
router.get('/', controllers.TaskController.findAll);
router.get('/:id', controllers.TaskController.findOneById);
router.post('/', controllers.TaskController.create)
router.put('/:id', controllers.TaskController.update)
router.delete('/:id', controllers.TaskController.borrar)
module.exports = router;
