

var mongoose = require('mongoose')

var db = mongoose.createConnection('mongodb://localhost:27017/own')

db.once('open',()=>{
    
    console.log('we are connected to the database');
    
});

module.exports =  db