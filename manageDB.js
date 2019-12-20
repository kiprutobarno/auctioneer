require("dotenv/config");
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
pool.on("connect", () => {
  console.log("...connected to database...");
});

/** Create users table
 * * @returns {Promise}
 */
const createUsersTable = async () => {
  try {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, email VARCHAR(50) UNIQUE NOT NULL, password VARCHAR(100) NOT NULL, dateCreated TIMESTAMP, dateModified TIMESTAMP)`
    );
    console.log(`....users table successfully created....`);
    await pool.end();
  } catch (error) {
    console.log(error);
  }
};

/**Drop users table
 ** @returns {Promise}
 */
const dropUsersTable = async () => {
  try {
    await pool.query(`DROP TABLE IF EXISTS users`);
    console.log(`....users table successfully dropped....`);
    await pool.end();
  } catch (error) {
    console.log(error);
  }
};

/** Create owners table
 * * @returns {Promise}
 */
const createOwnersTable = async () => {
  try {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS owners(id SERIAL PRIMARY KEY,firstName VARCHAR(50) NOT NULL,lastName VARCHAR(50) NOT NULL, email VARCHAR(50) UNIQUE NOT NULL,createdBy VARCHAR(50) REFERENCES users(email),dateCreated TIMESTAMP,dateModified TIMESTAMP)`
    );
    console.log(`....owners table successfully created....`);
    await pool.end();
  } catch (error) {
    console.log(error);
  }
};

/**
 * * @returns {Promise}
 */
const dropOwnersTable = async () => {
  try {
    await pool.query(`DROP TABLE IF EXISTS owners`);
    console.log(`....owners table successfully dropped....`);
    await pool.end();
  } catch (error) {
    console.log(error);
  }
};

/** Create owners table
 * * @returns {Promise}
 */
const createCategoriesTable = async () => {
  try {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS categories(id SERIAL PRIMARY KEY,categoryName VARCHAR(50) NOT NULL,createdBy INTEGER REFERENCES users(id),dateCreated TIMESTAMP, dateModified TIMESTAMP)`
    );
    console.log(`....categories table successfully created....`);
    await pool.end();
  } catch (error) {
    console.log(error);
  }
};

/**
 * * @returns {Promise}
 */
const dropCategoriesTable = async () => {
  try {
    await pool.query(`DROP TABLE IF EXISTS categories`);
    console.log(`....categories table successfully dropped....`);
    await pool.end();
  } catch (error) {
    console.log(error);
  }
};

/** Create items table
 * * @returns {Promise}
 */
const createItemsTable = async () => {
  try {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS items(id SERIAL PRIMARY KEY,categoryId INTEGER REFERENCES categories(id),ownerId INTEGER REFERENCES owners(id),itemName VARCHAR(50) NOT NULL,createdBy INTEGER REFERENCES users(id),dateCreated TIMESTAMP,dateModified TIMESTAMP)`
    );
    console.log(`....items table successfully created....`);
    await pool.end();
  } catch (error) {
    console.log(error);
  }
};

/**
 * * @returns {Promise}
 */
const dropItemsTable = async () => {
  try {
    await pool.query(`DROP TABLE IF EXISTS items`);
    console.log(`....items table successfully dropped....`);
    await pool.end();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUsersTable,
  createOwnersTable,
  createItemsTable,
  createCategoriesTable,
  dropUsersTable,
  dropOwnersTable,
  dropCategoriesTable,
  dropItemsTable
};

require("make-runnable");
