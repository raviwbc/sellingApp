
const { poolPromise } = require('../config/dbConfig');

exports.getAllRecords = async () => {
  const pool = await poolPromise;
  const result = await pool.request().query('select * from bidHistorylist');
  return result.recordset
};

exports.getRecordById = async (id) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input('id', id)
    .query('SELECT * FROM bidHistorylist WHERE id = @id');
  return result.recordset[0];
};

exports.createRecord = async (data) => {
  const pool = await poolPromise;
  console.log('1')
  const topPrize = await pool.request().query('select top 1 * from bidHistorylist ORDER BY Prize DESC')
  console.log(topPrize)
  const maxValue = topPrize.recordset.length ? topPrize.recordset[0]?.prize : 0;
  const bidTeam = topPrize.recordset.length ? topPrize.recordset[0]?.team : ''
  console.log(maxValue)
  if(maxValue <  data.prize && bidTeam != data.team){  
  const result = await pool
    .request()
    .input('team', data.team)
    .input('pname', data.pname)
    .input('dateTime', new Date())
    .input('prize', data.prize)
    .query(
      `INSERT INTO bidHistorylist (team, pname, dateTime, prize) 
       OUTPUT INSERTED.* VALUES (@team, @pname, @dateTime, @prize)`
    );
    return  {statuscode: 201, message : 'Your bid have been Accepted', data :result.recordset[0]}
  
  
  }else{
    const err = new Error('Alreday bidded by another team')
    err.status = 409;
    err.message = 'Alreday bidded by another team';
    console.log(err)
    return  bidTeam == data.team ?  {statuscode: 409, message : 'Already you have raised the last bid'} : {statuscode: 409, message : 'Alreday bidded by another team at this prize'} ;
  }
};

exports.updateRecord = async (id, data) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input('team', data.team)
    .input('pname', data.pname)
    .input('dateTime', data.dateTime)
    .input('prize', data.prize)
    .query(
      `UPDATE bidHistorylist SET 
      team = @team, 
         pname = @pname, 
         dateTime = @dateTime, 
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
    .query('DELETE FROM bidHistorylist WHERE id = @id');
  return result.rowsAffected[0];
};


exports.deleteAllRecord = async () => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .query('DELETE FROM bidHistorylist');
  return result.rowsAffected[0];
};