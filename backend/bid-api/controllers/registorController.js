// controllers/recordController.js
const model = require('../models/registorModel');
const teamsModel = require('../models/teamsModel');

exports.getAllRecords = async (req, res) => {
  try {
    const records = await model.getAllRecords();
    res.json({data : records, status : 201, message : "User created successfully"});
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve records' });
  }
};

exports.getAllTeamsRecords = async (req, res) => {
  try {
    const records = await teamsModel.getAllRecords();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve records' });
  }
};

exports.getRecordById = async (req, res) => {
  try {
    const record = await model.getRecordById(req.params.id);
    if (record) res.json(record);
    else res.status(404).json({ error: 'Record not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve record' });
  }
};

exports.createRecord = async (req, res) => {
  try {
    const newRecord = await model.createRecord(req.body);
    res.status(201).json(newRecord);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Failed to create record' });
  }
};

exports.updateRecord = async (req, res) => {
  try {
    const updatedRecord = await model.updateRecord(req.params.id, req.body);
    if (updatedRecord) res.json(updatedRecord);
    else res.status(404).json({ error: 'Record not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update record' });
  }
};

exports.deleteRecord = async (req, res) => {
  try {
    const rowsDeleted = await model.deleteRecord(req.params.id);
    if (rowsDeleted) res.json({ message: 'Record deleted successfully' });
    else res.status(404).json({ error: 'Record not found' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete record' });
  }
};
