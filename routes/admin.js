let express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
const State = require('../ussd_app/models/state')
const LGA = require('../ussd_app/models/local_area');
const Facility = require('../ussd_app/models/facility');
const User = require('../models/user');


router.get('/', function (req, res, next) {
     res.render('admin/dashboard');
});



router.get('/facilities', function (req, res, next) {
     res.render('admin/facilities');
});

router.get('/viewusers', function (req, res, next) {
     res.render('admin/viewusers');
});

router.get('/createview',(req,res,next)=>{
     res.render('admin/create')
});
router.get('/state',(req,res,next)=>{
    res.render('admin/viewState');
});
router.get('/lga',(req,res,next)=>{
    res.render('admin/lgas');
});


router.post('/state',(req,res,next)=>{
    res.render('admin/viewState');
});

router.post('/admin/createUser',(req,res,next)=>{
     let body = req.body,
     fullname = body.fullname,
     email = body.email,
     username = body.username,
     password = body.password;

     User.findOne({email:email},(error,user)=>{
          if(error){
               res.status(500).send('error occured');
          }else{
             if(user){
               res.status(500).send('User already exist');
             }else{
               var record = new User();
               record.fullname = fullname;
               record.email = email;
               record.username = username;
               record.password = record.hashPassword(password);
               record.save((error,user)=>{
                    if(error){
                         res.status(500).send('database error please try again later');
                    }else{
                         res.render('/');
                    }
               })
             }  
          }
     })
});


module.exports = router;
