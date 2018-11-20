var express = require('express')
var router = express.Router()
var axios = require('axios')

/* GET users listing. */

router.get('/', (req,res)=> {
  res.render('users')
})

router.get('/user', (req,res)=> {
  res.render('userRegister')
})

router.get('/list', (req,res)=> {
  axios.get('http://localhost:5555/api/users/list')
    .then(users=> res.render('user', {users: users.data}))
    .catch(error => {
      console.log('Error displaying users '+error)
      res.render('error', {error: error, message: "displaying users."})
  })
})

router.get('/user/:id', (req,res)=> {
  axios.get('http://localhost:5555/api/users/user/'+req.params.id)
    .then(user=> res.render('user', {user: user.data}))
    .catch(error => {
      console.log('Error displaying user '+error)
      res.render('error', {error: error, message: "displaying user."})
  })
})

router.post('/user', (req,res) => {
  axios.post('http://localhost:5555/api/users/user', req.body) 
      .then(() => res.redirect('http://localhost:5555/users'))
      .catch(error => {
          console.log('Insertion error '+error)
          res.render('error', {error: error, message: "Error in insertion"})
      })
})

module.exports = router
