const express = require('express')
const controller = require('../controllers/myteamController');
const router = express.Router()
const verifyToken = require('../config/jwtVerify')


router.get('/:team', controller.getRecordByTeam)

module.exports = router