const { poolPromise } = require('../config/dbConfig');

exports.login = async (data) => {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input('username', data.username)
      .input('password', data.password)
      .query('SELECT * FROM registration WHERE username = @username and pass = @password');
      console.log(result)
      
    return result.rowsAffected[0];
  };