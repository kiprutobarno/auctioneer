require("dotenv/config");
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
pool.on("connect", () => {
  console.log("...connected to database...");
});

/** Create users table */
const createUsersTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS users(
                          id SERIAL PRIMARY KEY,
                          email VARCHAR(50) UNIQUE NOT NULL,
                          password VARCHAR(100) NOT NULL,
                          dateCreated TIMESTAMP,
                          dateModified TIMESTAMP)`;
  pool
    .query(queryText)
    .then(results => {
      console.log("...users table succcessfully created...");
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

/**Drop users table */
const dropUsersTable = () => {
  const dropTableQuery = `DROP TABLE IF EXISTS users`;
  pool
    .query(dropTableQuery)
    .then(results => {
      console.log("....users table succcessfully dropped....");
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

module.exports = { createUsersTable, dropUsersTable };

require("make-runnable");
