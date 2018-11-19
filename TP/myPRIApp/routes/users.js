var express = require('express');
var router = express.Router();
const passport = require('passport');
const User = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/user', (req,res)=> {
  res.render('userRegister')
})

router.post('/register', (req, res, next) => {
  
  var newUser = new User ({
    username : req.body.username, 
    name: req.body.name, 
    mail: req.body.mail,
  })
  console.dir(req.body.type)
  console.dir('touuuu')

  User.register(newUser, req.body.password, (err, user) => {
      if (err) {
        //return res.render('register', { error : err.message });
      }
      else res.jsonp(JSON.stringify('OK'))
      passport.authenticate('local')(req, res, () => {
          req.session.save((err) => {
              if (err) {
                  return next(err);
              }
              res.redirect('/');
          });
      });
  });
})

module.exports = router;
