var express= require('express')
var jwt = require("jwt-simple");
var moment = require('moment');
var User = require('../Models/users.js')
var router = express.Router()

router.post('/', function(req, res, next) {
  var token = req.body.access_token;
  
    let name;
    if(token){
        try{
            var decoded = jwt.decode(token,req.app.get('jwtTokenSecret'));
            if(decoded.exp < Date.now()){
                return res.end('token expired',401);
            }
            name = decoded.name;
        } catch(err){
            return res.status(401);
        }
    }
    
    var user = new User();
    user.getUser({
        name
    },(err,user)=>{
        if(user){
            return res.status(200).json({
                name: user.name,
            })
        } else {
            return res.status(404).end()
        }
    })
});

module.exports = router
