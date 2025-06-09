const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ListApp",
  password: "adela123",
  port: 5432,
});

module.exports = pool;
