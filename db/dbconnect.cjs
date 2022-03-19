const { Pool } = require('pg');

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'mydb',
  password: 'mypass',
  port: 5432,
});

module.exports = pool;
