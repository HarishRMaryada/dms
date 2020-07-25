const config = require('config')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
module.exports = function auth(req,res,next){
if(_.includes(req.originalUrl,'signup')||_.includes(req.originalUrl,'token')){
    next()
}else{
    const token = req.header('token')
    if(!token) return res.status(401).json({success:false,access:"Denied access"})
    try{
        const decode = jwt.verify(token,config.get('jwtPrivateKey')) 
        req.user = decode
        next()
    }catch(e){
        res.status(400).json({success:false,access:"invalid token"})
    }
}
}