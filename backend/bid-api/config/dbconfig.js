// config/dbConfig.js
const sql = require('mssql');

// Database configuration
const config = {
  user: 'sa',    // Replace with your database username
  password: 'Wbcuser_1',// Replace with your database password
  server: '192.168.1.107',    // Replace with your server name or IP
  database: 'test_db',// Replace with your database name
  options: {
    encrypt: true, // For Azure, set to true
    trustServerCertificate: true // For local dev, set to true
  }
};

// Create and export the connection pool
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL');
    return pool;
  })
  .catch(err => {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  });

module.exports = { sql, poolPromise };

