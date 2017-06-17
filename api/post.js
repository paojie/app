var express= require('express')
var jwt = require("jwt-simple");
var Post  = require('../Models/post');
var router = express.Router()
var check = require('../middleware/check.js')


router.get('/', function(req, res, next) {
    var postEntity = new Post();
    var author = req.query.author
    var query = {
        author
    }

    if(author === 'all') {
        query = null
    }
    postEntity.get(query, (err, posts) => {
        if(err) {
            return res.status(500).end('服务器错误')
        }
        return res.status(200).json(posts.reverse())
    })
    
})


router.post('/', check, function(req, res, next) {
    //  用Model创建Entity，Entity是具有具体的数据库操作CRUD的，如果要执行查询，需要依赖Model，当然Entity也是可以做到的
    var postEntity = new Post();
    var name = req.userName;

    var post = {
        title: req.body.title,
        content: req.body.content,
        type: req.body.type,
        author: name
    }
    postEntity.savePost(post,err=>{
        if(err){
            return res.status(500).end('服务器错误')
        } else {
            return res.status(200).end('发表文章成功')
        }
    })
})


// router.post('/', function(req, res, next) {

// })

module.exports =  router