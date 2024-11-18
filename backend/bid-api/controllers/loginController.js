const model = require('../models/loginModel')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../config/jwt.js')

// const SECRET_KEY = 'ravima450';
exports.loginAccount = async (req, res) => {
    try {
        console.log(req.body)
      const records = await model.login(req.body);
      if(records == 1){
        const user  = {name : "ravi"}
        const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' }); // 1 hour expiration

        res.json({message : 'Login successfully', jwtToken : token, status: 200});
      }else{
        res.json({message : 'user not exist', status: 404});
      }
      
    } catch (err) {
      res.status(500).json({ error: 'login failed' });
    }
  };