const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  database: 'googlemap',
  user: 'root',
  // password: '<your-pw>'
})

module.exports = pool;