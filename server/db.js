const Pool = require("pg").Pool;
const keys = require('./keys');

const pgClient = new Pool({
  user: keys.pgUser,
  password: keys.pgPassword,
  host: keys.pgHost,
  database: keys.pgDatabase,
  port: keys.pgPort
});

module.exports = pgClient;