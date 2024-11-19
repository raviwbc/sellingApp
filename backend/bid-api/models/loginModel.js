const { poolPromise } = require('../config/dbConfig');

exports.login = async (data) => {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('username', data.username)
      .input('password', data.password)
      .query('SELECT * FROM registration WHERE username = @username and pass = @password');
      
    return {rowsAffected : result?.rowsAffected[0], data : result?.recordset[0]} 
  };