var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const State = require('../ussd_app/models/state')
const LGA = require('../ussd_app/models/local_area');
const Facility = require('../ussd_app/models/facility');


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/dashboard', function (req, res, next) {
        res.render('dashboard');
});


module.exports = router;
