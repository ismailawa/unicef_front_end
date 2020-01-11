var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');



/* GET home page. */
router.get('/', function (req, res, next) {
  State.find()
  .exec()
  .then((state)=>{
    res.render('index', {state});
  });  

});

module.exports = router;
