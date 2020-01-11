var express = require('express');
var router = express.Router();
var controllers = require('../ussd_app/ussd_end_point')


router.route('/').get(controllers.resgisterQuestionaire);

module.exports = router;