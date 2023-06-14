const express = require('express');
const controllers = require('../controllers');

const router = express.Router();
// DEFINIR LOS METODOS === FUNCIONES // CODIGO 
// metodo => GET, POST, DELETE, PUT... 
// ENDPOINT => PARAMS
/* GET users listing. */
// CONTROLADOR => CARGA LOGICA
router.get('/', controllers.TaskController.findAll);
router.get('/:id', controllers.TaskController.findOneById);

// REQ.BODY
router.post('/', controllers.TaskController.create)
router.put('/:id', controllers.TaskController.update)
router.delete('/:id', controllers.TaskController.borrar) // 1er
router.delete('/delete/:id', controllers.TaskController.logicDelete)
module.exports = router;
