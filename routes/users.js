let express = require('express');
let router = express.Router();

/* GET users listing. */

router.post('/login', (req, res, next)=> {
  let username = req.body.username;
  let password = req.body.password;
  if(username.length)
  console.log(`${username} and ${password}`);
  res.render('login');
});

module.exports = router;
