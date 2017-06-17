var express= require('express')
var Post = require('../Models/post.js')
var router = express.Router()

router.get('/', function(req, res, next) {
    const id = req.query.id

    Post.get({
        id
    }, (error, post) => {
        if(error) {
            return res.status(500).end('服务器错误')
        }
        return res.status(200).json(post)
    })

})

module.exports = router