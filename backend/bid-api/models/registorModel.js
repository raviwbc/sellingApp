// models/recordModel.js
const { poolPromise } = require('../config/dbConfig');

exports.getAllRecords = async () => {
  const pool = await poolPromise;
  const result = await pool.request().query('SELECT * FROM registration');
  return result.recordset;
};

exports.getRecordById = async (id) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input('id', id)
    .query('SELECT * FROM registration WHERE id = @id');
  return result.recordset[0];
};

exports.createRecord = async (data) => {
  const pool = await poolPromise;
  console.log(data)
  const result = await pool
    .request()
    .input('name', data.name)
    .input('tname', data.teamName)
    .input('userType', 'buyer')
    .input('base_prize', 0)
    .input('available_members', 0)
    .input('username', data.userName)
    .input('password', data.password)
    .query(
      `INSERT INTO registration (name, tname, userType, base_prize, available_members, username, password) 
       OUTPUT INSERTED.* VALUES (@name, @tname, @userType, @base_prize, @available_members, @username, @password)`
    );
    console.log(result)
  return result.recordset[0];
};

exports.updateRecord = async (id, data) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input('id', id)
    .input('name', data.name)
    .input('tname', data.tname)
    .input('base_prize', data.base_prize)
    .input('available_members', data.available_members)
    .input('username', data.username)
    .input('password', data.password)
    .query(
      `UPDATE registration SET 
         name = @name, 
         tname = @tname, 
         base_prize = @base_prize, 
         available_members = @available_members, 
         username = @username, 
         password = @password 
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
    .query('DELETE FROM registration WHERE id = @id');
  return result.rowsAffected[0];
};

