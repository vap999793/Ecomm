const jwt = require('jsonwebtoken');
const {JWT_KEY} = process.env;

function userAuthentication(req, res, next) {
    try{
        const bearerToken = req.headers.authorization;
        const token = bearerToken.split(" ")[1];
    
        const payload = jwt.verify(token, JWT_KEY);
        req.session = {
            user : payload
        };
    
        next();
    }
    catch(error){
        res.status(401);
        return res.json({error : "Invalid Token"});
    }
}

function adminAuthentication(req, res, next){
    try{
        const bearerToken = req.headers.authorization;
        const token = bearerToken.split(" ")[1];
    
        const payload = jwt.verify(token, JWT_KEY);
        req.session = {
            user : payload
        };

        if(payload.isAdmin){
            return next();
        }

        res.status(401);
        // return next(new Error("You are not authorized to access this because you are not an ADMIN"));
        return res.json({error: "You are not authorized to access Resourse"});
    }
    catch(error){
        res.status(401);
        return res.json({error : "Invalid Token"});
    }
}

module.exports = {userAuthentication, adminAuthentication};