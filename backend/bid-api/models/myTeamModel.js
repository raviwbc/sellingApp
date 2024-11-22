
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
    .query(`
        SELECT * FROM (
SELECT 
    completed_list.tname, 
    SUM(completed_list.prize) AS spent_prize, 
    COUNT(completed_list.pname) AS players, 	
    teamList.availableprize
FROM 
    completed_list
INNER JOIN 
    teamList ON completed_list.tname = teamList.teamName
GROUP BY 
    teamList.availableprize,
	completed_list.tname) AS result where tname = @team`);
    console.log(teamMembers)
    return {ok:team, teamData: spendAmount.recordset[0], playerData : teamMembers.recordset[0]}
}