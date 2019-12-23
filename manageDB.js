require("dotenv/config");
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
pool.on("connect", () => {
  console.log("...connected to database...");
});

const create = async (table, statement) => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS ${table}(${statement})`);
    await pool.end();
    console.log(`....${table} table successfully created....`);
  } catch (error) {
    console.log(error);
  }
};

const drop = async table => {
  try {
    await pool.query(`DROP TABLE IF EXISTS ${table}`);
    console.log(`....${table} table successfully dropped....`);
    await pool.end();
  } catch (error) {
    console.log(error);
  }
};

/** Create users table
 * * @returns {Promise}
 */

const createUsersTable = () => {
  create(
    "users",
    "id SERIAL PRIMARY KEY, email VARCHAR(50) UNIQUE NOT NULL, password VARCHAR(100) NOT NULL, dateCreated TIMESTAMP, dateModified TIMESTAMP"
  );
};

/**Drop users table
 ** @returns {Promise}
 */
const dropUsersTable = () => {
  drop("users");
};

/** Create owners table
 * * @returns {Promise}
 */
const createOwnersTable = () => {
  create(
    "owners",
    "id SERIAL PRIMARY KEY,firstName VARCHAR(50) NOT NULL,lastName VARCHAR(50) NOT NULL, email VARCHAR(50) UNIQUE NOT NULL,createdBy VARCHAR(50) REFERENCES users(email),dateCreated TIMESTAMP,dateModified TIMESTAMP"
  );
};

/**
 * * @returns {Promise}
 */
const dropOwnersTable = () => {
  drop("owners");
};

/** Create owners table
 * * @returns {Promise}
 */
const createCategoriesTable = () => {
  create(
    "categories",
    "id SERIAL PRIMARY KEY,categoryName VARCHAR(50) NOT NULL,createdBy INTEGER REFERENCES users(id),dateCreated TIMESTAMP, dateModified TIMESTAMP"
  );
};

/**
 * * @returns {Promise}
 */
const dropCategoriesTable = () => {
  drop("categories");
};

/** Create items table
 * * @returns {Promise}
 */
const createItemsTable = () => {
  create(
    "items",
    "id SERIAL PRIMARY KEY,categoryId INTEGER REFERENCES categories(id),ownerId INTEGER REFERENCES owners(id),itemName VARCHAR(50) NOT NULL,createdBy INTEGER REFERENCES users(id),dateCreated TIMESTAMP,dateModified TIMESTAMP"
  );
};

/**
 * * @returns {Promise}
 */
const dropItemsTable = () => {
  drop("items");
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
