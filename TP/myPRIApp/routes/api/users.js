var express = require('express')
var router = express.Router()
var User = require('../../controllers/user')



router.get('/user/:id', (req,res)=> {
    User.getUser(req.params.id)
        .then(data=> res.jsonp(data))
        .catch(error => res.status(500).send('Query error: '+error))
})

router.get('/list', (req,res) => {
    User.list()
        .then(data=> res.jsonp(data))
        .catch(error => res.status(500).send('Listing error: '+error))
})

router.post('/user', (req,res) => {
    User.insert(req.body)
        .then(data => res.jsonp(data))
        .catch(error => res.status(500).send('Insert error: '+error))
})

module.exports = router;
