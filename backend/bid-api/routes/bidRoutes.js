// routes/recordRoutes.js
const express = require('express');
const controller = require('../controllers/registorController');
const router = express.Router();
const verifyToken = require('../config/jwtVerify')

router.get('/', verifyToken, controller.getAllRecords);
router.get('/:id', verifyToken, controller.getRecordById);
router.post('/',  controller.createRecord);
router.put('/:id', verifyToken, controller.updateRecord);
router.delete('/:id', verifyToken, controller.deleteRecord);

module.exports = router;
