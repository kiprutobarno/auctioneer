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

/** Create owners table */
const createOwnersTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS owners(
                          id SERIAL PRIMARY KEY,
                          firstName VARCHAR(50) NOT NULL,
                          lastName VARCHAR(50) NOT NULL,
                          createdBy INTEGER REFERENCES users(id),
                          dateCreated TIMESTAMP,
                          dateModified TIMESTAMP)`;
  pool
    .query(queryText)
    .then(results => {
      console.log("...owners table succcessfully created...");
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

const dropOwnersTable = () => {
  const dropTableQuery = `DROP TABLE IF EXISTS owners`;
  pool
    .query(dropTableQuery)
    .then(results => {
      console.log("....owners table succcessfully dropped....");
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

/** Create owners table */
const createCategoriesTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS categories(
                          id SERIAL PRIMARY KEY,
                          categoryName VARCHAR(50) NOT NULL,
                          createdBy INTEGER REFERENCES users(id),
                          dateCreated TIMESTAMP,
                          dateModified TIMESTAMP)`;
  pool
    .query(queryText)
    .then(results => {
      console.log("...categories table succcessfully created...");
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

const dropCategoriesTable = () => {
  const dropTableQuery = `DROP TABLE IF EXISTS categories`;
  pool
    .query(dropTableQuery)
    .then(results => {
      console.log("....categories table succcessfully dropped....");
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

/** Create items table */
const createItemsTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS items(
                          id SERIAL PRIMARY KEY,
                          categoryId INTEGER REFERENCES categories(id),
                          ownerId INTEGER REFERENCES owners(id),
                          itemName VARCHAR(50) NOT NULL,
                          createdBy INTEGER REFERENCES users(id),
                          dateCreated TIMESTAMP,
                          dateModified TIMESTAMP)`;
  pool
    .query(queryText)
    .then(results => {
      console.log("...items table succcessfully created...");
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

const dropItemsTable = () => {
  const dropTableQuery = `DROP TABLE IF EXISTS items`;
  pool
    .query(dropTableQuery)
    .then(results => {
      console.log("....items table succcessfully dropped....");
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
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
