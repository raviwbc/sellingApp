const express = require('express');
const controller = require('../controllers/loginController');
const router = express.Router();
const verifyToken = require('../config/jwtVerify')

router.get('/', verifyToken, controller.currentUser);

module.exports = router;