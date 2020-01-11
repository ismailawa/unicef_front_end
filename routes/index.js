var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const State = require('../ussd_app/models/state')


/* GET home page. */
router.get('/', function (req, res, next) {
  State.find()
  .exec()
  .then((state)=>{
    res.render('index', {state});
  });  

});

module.exports = router;
