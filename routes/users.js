let express = require('express');
let router = express.Router();
let User = require('../models/user');

/* GET users listing. */

router.post('/login', (req, res, next)=> {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({email:email})

      .then(user=>{
        console.log(user);
        if(!user){
          return res.redirect('/login')
        }
        if(user.password === password){
          req.session.isAuthenticated = true;
          req.session.user = user;
          return req.session.save(err=>{
             res.redirect('/admin')
          });
        }else {
          return res.redirect('/login');
        }
      }).catch(err=>{
      return res.send({error:err})  ;
  })
});

module.exports = router;
