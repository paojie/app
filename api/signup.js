var express= require('express')
var jwt = require("jwt-simple");
var path = require('path');
var moment = require('moment');
var User = require('../Models/users.js')
var router = express.Router()


router.post('/', function(req, res, next) {
    var name = req.body.name,
        passwd = req.body.passwd,
        email = req.body.email
    var user = new User()
    user.getUser({name}, function(error, item) {
        
        if(error) {
            return res.status(500).end('服务器错误')
        }
        if(item) {
            return res.status(500).end('该账号已经有人注册!')
        }
        user.saveUser({
            name,
            passwd,
            email
        }, function(error) {
            if(error){
                return res.status(500).end()
            }
            // req.session.user = user
            var expires = moment().add(7,'days').valueOf();
            var token = jwt.encode({
                name,
                exp: expires
            }, req.app.get('jwtTokenSecret'));
            return res.status(200).json(token)
            
        })
    })
})

module.exports = router


