const model = require('../models/loginModel')
const jwt = require('jsonwebtoken')
const { SECRET_KEY } = require('../config/jwt.js')

// const SECRET_KEY = 'ravima450';
exports.loginAccount = async (req, res) => {
    try {
      const records = await model.login(req.body);
      console.log(records)
      if(records.rowsAffected == 1){
        const user  = records.data;
        const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' }); // 1 hour expiration

        res.json({message : 'Login successfully', jwtToken : token, status: 200, data : user});
      }else{
        res.json({message : 'user not exist', status: 404});
      }
      
    } catch (err) {
      res.status(500).json({ error: 'login failed' });
    }
  };