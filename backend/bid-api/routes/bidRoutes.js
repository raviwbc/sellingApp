// routes/recordRoutes.js
const express = require('express');
const controller = require('../controllers/registorController');
const router = express.Router();

router.get('/', controller.getAllRecords);
router.get('/:id', controller.getRecordById);
router.post('/', controller.createRecord);
router.put('/:id', controller.updateRecord);
router.delete('/:id', controller.deleteRecord);

module.exports = router;
