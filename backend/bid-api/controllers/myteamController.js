const model = require('../models/myTeamModel')

exports.getRecordByTeam = async (req, res) => {
    try {
        console.log(req.params.team)
      const record = await model.getRecordByTeam(req.params.team);
      if (record) res.json(record);
      else res.status(404).json({ error: 'Record not found' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to retrieve record' });
    }
  };