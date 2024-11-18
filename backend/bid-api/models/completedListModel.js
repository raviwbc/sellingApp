
const { poolPromise } = require('../config/dbConfig');

exports.getAllRecords = async () => {
  const pool = await poolPromise;
  const result = await pool.request().query('select * from completed_list');
  return result.recordset;
};

exports.getRecordById = async (id) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input('id', id)
    .query('SELECT * FROM completed_list WHERE id = @id');
  return result.recordset[0];
};

exports.createRecord = async (data) => {
  console.log(data)
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input('pname', data.name)
    .input('tname', data.tname)
    .input('bid_history', data.bid_history)
    .input('prize', data.prize)
    .query(
      `INSERT INTO completed_list (pname, tname, bid_history, prize) 
       OUTPUT INSERTED.* VALUES (@pname, @tname, @bid_history, @prize)`
    );
  return result.recordset[0];
};

exports.updateRecord = async (id, data) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input('pname', data.name)
    .input('tname', data.tname)
    .input('bid_history', data.bid_history)
    .input('prize', data.prize)
    .query(
      `UPDATE completed_list SET 
      pname = @pname, 
         tname = @tname, 
         bid_history = @bid_history, 
         prize = @prize
       WHERE id = @id
       OUTPUT INSERTED.*`
    );
  return result.recordset[0];
};

exports.deleteRecord = async (id) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input('id', id)
    .query('DELETE FROM completed_list WHERE id = @id');
  return result.rowsAffected[0];
};
