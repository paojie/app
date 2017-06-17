



module.exports =
    function (app) {
        app.use('/api/signin', require('./signin'))
        app.use('/api/signup', require('./signup'))
        app.use('/api/signout', require('./signout'))
        app.use('/api/user', require('./user.js'))
        app.use('/api/post', require('./post.js'))
        app.use('/api/detail', require('./getItem.js'))
    }