var express = require('express');
var router = express.Router();


router.route('/').get((req,res,next)=>{
    res.send({"name":"ismailawa"});
});

module.exports = router;