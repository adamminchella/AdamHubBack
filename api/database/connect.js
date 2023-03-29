const { Pool } = require("pg");

require("dotenv").config();

const connectionLink = process.env.CONNECTION_STRING;

const db = new Pool({
  connectionString: connectionLink,
});

console.log("DB connection established.");

module.exports = db;
