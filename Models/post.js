var  mongoose = require('mongoose') 
var db = require('./db')
mongoose.Promise = global.Promise

var PostSchema = new mongoose.Schema({
    author:String,
    title:String,
    content:String,
    flag: String,
    type: String,
    discussion: Array,
    votes: Array,
    time:{}
})


//为Schema模型追加savePost方法，
PostSchema.methods.savePost = function(post,cb){
    var date = new Date();
    var time = {
      date: date,
      year : date.getFullYear(),
      month : date.getFullYear() + "-" + (date.getMonth() + 1),
      day : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
      minute : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
      date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) 
    }
    this.flag = date.getTime() + post.author;
    this.author = post.author;
    this.title = post.title;
    this.content = post.content;
    this.time = time;
    this.type = post.type;
    this.discussion = [];
    this.votes = []
    this.save(cb);
}

PostSchema.methods.get = function(query,cb){
    if(query===null){
        return this.model('post').find(cb);
    }
    this.model('post').find(query,cb);
};

module.exports =  db.model('post',PostSchema)






