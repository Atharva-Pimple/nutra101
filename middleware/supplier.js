require('dotenv').config();
const jwt=require('jsonwebtoken');

module.exports=function(req,res,next){
    const token=req.header('sup-auth-token');
    if(!token) return res.status(401).send('Access denied. no token provided');

    try{
        const decoded=jwt.verify(token,process.env.jwtPrivateKey);
        req.supplier=decoded;
        next();
    }
    catch(ex){
        res.status(400).send('Invalid token');
    }
}