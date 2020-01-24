let express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
const State = require('../ussd_app/models/state')
const LGA = require('../ussd_app/models/local_area');
const Facility = require('../ussd_app/models/facility');
const User = require('../models/user');
const Role = require('../models/role');


router.get('/', function (req, res, next) {
     res.render('admin/dashboard');
});



router.get('/facilities', function (req, res, next) {
     res.render('admin/facilities');
});

router.get('/users', function (req, res, next) {
        User.find()
            .exec()
            .then(users=>{
                Role.find()
                    .exec()
                    .then(roles=>{
                        return res.render('admin/viewusers',{users:users, roles:roles});
                    })
            })
            .catch(error=>{
                return res.send(error);
            })
});

router.post('/createUser',async (req,res,next)=>{
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let username = req.body.username;
    let phone = req.body.phone;
    let role = req.body.role;
    let password = req.body.password;
    const user = new User({
        firstName:firstName,
        lastName:lastName,
        email:email,
        username:username,
        phone:phone,
        role:role,
        password:password
    });
    const newuser = await user.save();
    return res.redirect('/admin/users');
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
