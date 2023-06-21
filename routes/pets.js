const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('metodos de pets');
});

module.exports = router;
