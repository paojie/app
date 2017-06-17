var express= require('express')
var jwt = require("jwt-simple");
var moment = require('moment');
var User = require('../Models/users.js')
var router = express.Router()

router.post('/', function(req, res, next) {
    res.send('sb')
})

module.exports = router


