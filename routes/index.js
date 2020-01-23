const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const State = require('../ussd_app/models/state');
const LGA = require('../ussd_app/models/local_area');
const Facility = require('../ussd_app/models/facility');


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/login', function (req, res, next) {
    res.render('login');
});

module.exports = router;
