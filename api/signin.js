var express= require('express')
var jwt = require("jwt-simple");
var moment = require('moment');
var User = require('../Models/users.js')
var router = express.Router()

router.post('/', function(req, res, next) {
    let name = req.body.name,
        passwd = req.body.passwd




    var user = new User()
    user.getUser({name}, function(error, item) {
        if(error) {
            return res.status(500).end('服务器错误')
        }
        if(!item) {
            return res.status(404).end('该账号没有注册')
        }
        if(item.passwd !== passwd) {
             return res.status(500).end('账号或密码不对')
        }
        // req.session.user = user
        // 返回7天的毫秒数
        var expires = moment().add(7,'days').valueOf();
        var token = jwt.encode({
            name,
            exp: expires   // 通过moment.js设置7天后失效
            //req.app是对Expressapplication实例的引用，通过个属性我们可以访问app对象中的设置、属性、中间件等。
            // get方法根据set的key拿到value
        }, req.app.get('jwtTokenSecret'));
        return res.status(200).json(token)
    })
})

module.exports = router
