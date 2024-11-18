
const { poolPromise } = require('../config/dbConfig');

exports.getAllRecords = async () => {
  const pool = await poolPromise;
  const result = await pool.request().query('select * from active_item');
  return result.recordset.map(res=> {
    return {...res, Records : JSON.parse(res.Records)}
  })
};

exports.getRecordById = async (id) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input('id', id)
    .query('SELECT * FROM active_item WHERE id = @id');
  return result.recordset[0];
};

exports.createRecord = async (data) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input('name', data.name)
    .input('Country', data.Country)
    .input('Records', data.Records)
    .input('base_p', data.base_p)
    .query(
      `INSERT INTO active_item (name, Country, Records, base_p) 
       OUTPUT INSERTED.* VALUES (@name, @Country, @Records, @base_p)`
    );
  return result.recordset[0];
};

exports.updateRecord = async (id, data) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input('name', data.name)
    .input('County', data.County)
    .input('Records', data.Records)
    .input('base_p', data.base_p)
    .query(
      `UPDATE active_item SET 
      name = @name, 
         County = @County, 
         Records = @Records, 
         base_p = @base_p
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
    .query('DELETE FROM active_item WHERE id = @id');
  return result.rowsAffected[0];
};
