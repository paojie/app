var jwt = require("jwt-simple");

module.exports =  function(req,res,next){
    var token = req.body.access_token;
    var name;
    if(token){
        try{
            var decoded = jwt.decode(token,req.app.get('jwtTokenSecret'));
            if(decoded.exp < Date.now()){
                return res.end('token expired',401);
            }
            name = decoded.name;
        } catch(err){
            res.status(401);
            return res.send('token err');                                       
        }
    } else {
        return res.status(401).end('no token')
    }
    req.userName = name;
    next();
}