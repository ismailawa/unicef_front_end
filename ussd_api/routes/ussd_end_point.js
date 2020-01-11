var express = require('express');
var router = express.Router();
const controllers = require('../controllers/ussd_controllers');

router.route('/').post(controllers.questionaireController);

module.exports = router;