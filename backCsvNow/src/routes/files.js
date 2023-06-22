var express = require('express');
var router = express.Router();
var filesController = require('../controllers/FilesController')

/* GET home page. */
router.post('/', filesController.store);
router.get('/', filesController.getUserById);

module.exports = router;
