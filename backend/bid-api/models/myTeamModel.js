
const { poolPromise } = require('../config/dbConfig');


exports.getRecordByTeam = async (team)=>{
    const pool = await poolPromise;

    const teamMembers = await pool
    .request()
    .input('team', team)
    .query('SELECT * FROM completed_list WHERE tname = @team');
    const spendAmount = await pool
    .request()
    .input('team', team)
    .query('SELECT SUM(prize) AS total FROM completed_list WHERE tname= @team');
    return {ok:team, members : teamMembers?.recordset[0], spendAmount:spendAmount?.recordset[0]}
}