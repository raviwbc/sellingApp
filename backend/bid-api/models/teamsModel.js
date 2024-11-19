const { poolPromise } = require('../config/dbConfig');

exports.getAllRecords = async () => {
  const pool = await poolPromise;
  const result = await pool.request().query('SELECT * FROM teamList');
  return result.recordset;
}