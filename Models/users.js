
var db = require('./db')
var mongoose = require('mongoose')
mongoose.Promise = global.Promise;




var userSchema = new mongoose.Schema({
    name: String,
    passwd: String,
    email: String,
    avator: String,
    gender: String
})

userSchema.methods.saveUser = function (user, cb) {
    this.name = user.name
    this.passwd = user.passwd
    this.email = user.email
    this.avator = user.avator
    this.gender = user.gender
    this.save(cb)
}

userSchema.methods.getUser = function(query, cb) {

    this.model('User').findOne(query, cb)
}

module.exports =  db.model('User', userSchema)