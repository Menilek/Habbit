const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next){
    const token = req.header('x-auth-token');

    //check for token
    if(!token){
        return res.status(401).json({msg: 'Unauthorised user, no token found'});
    }

    try{
        //verify token
        const decoded = jwt.verify(token, config.get('jwt_secret'));
        //add user from payload
        req.user = decoded;
        next();
    } catch(e) {
        return res.status(400).json({msg: 'Token is not valid'})
    }
}

module.exports = auth;