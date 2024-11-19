const jwt = require('jsonwebtoken');
const {SECRET_KEY}  = require('./jwt');
const { json } = require('body-parser');


const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        res.status(403),json({message : 'No token provided'})
    }

    jwt.verify(token, SECRET_KEY, (err, decoded)=>{
        console.log(err)
        if(err){
            return res.status(401).json({ message: 'Failed to authenticate token' , err : err});
        }
        req.user = decoded;
        next();
    })
}

module.exports = verifyToken