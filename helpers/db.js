import { Pool } from "pg";
import config from "../config";

const pool = new Pool({ connectionString: config.DATABASE_URL });

/**Database  */
class Database {
  /** Create users table
   * * @returns {Promise}
   */
  createUsersTable = async () => {
    try {
      await pool.query(
        `CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, email VARCHAR(50) UNIQUE NOT NULL, password VARCHAR(100) NOT NULL, dateCreated TIMESTAMP, dateModified TIMESTAMP)`
      );
    } catch (error) {
      console.log(error);
    }
  };

  /**Drop users table
   ** @returns {Promise}
   */
  dropUsersTable = async () => {
    try {
      await pool.query(`DROP TABLE IF EXISTS users`);
    } catch (error) {
      console.log(error);
    }
  };

  /** Create owners table
   * * @returns {Promise}
   */
  createOwnersTable = async () => {
    try {
      await pool.query(
        `CREATE TABLE IF NOT EXISTS owners(id SERIAL PRIMARY KEY,firstName VARCHAR(50) NOT NULL,lastName VARCHAR(50) NOT NULL, email VARCHAR(50) UNIQUE NOT NULL,createdBy VARCHAR(50) REFERENCES users(email),dateCreated TIMESTAMP,dateModified TIMESTAMP)`
      );
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * * @returns {Promise}
   */
  dropOwnersTable = async () => {
    try {
      await pool.query(`DROP TABLE IF EXISTS owners`);
    } catch (error) {
      console.log(error);
    }
  };

  /** Create owners table
   * * @returns {Promise}
   */
  createCategoriesTable = async () => {
    try {
      await pool.query(
        `CREATE TABLE IF NOT EXISTS categories(id SERIAL PRIMARY KEY,categoryName VARCHAR(50) NOT NULL,createdBy INTEGER REFERENCES users(id),dateCreated TIMESTAMP, dateModified TIMESTAMP)`
      );
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * * @returns {Promise}
   */
  dropCategoriesTable = async () => {
    try {
      await pool.query(`DROP TABLE IF EXISTS categories`);
    } catch (error) {
      console.log(error);
    }
  };

  /** Create items table
   * * @returns {Promise}
   */
  createItemsTable = async () => {
    try {
      await pool.query(
        `CREATE TABLE IF NOT EXISTS items(id SERIAL PRIMARY KEY,categoryId INTEGER REFERENCES categories(id),ownerId INTEGER REFERENCES owners(id),itemName VARCHAR(50) NOT NULL,createdBy INTEGER REFERENCES users(id),dateCreated TIMESTAMP,dateModified TIMESTAMP)`
      );
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * * @returns {Promise}
   */
  dropItemsTable = async () => {
    try {
      await pool.query(`DROP TABLE IF EXISTS items`);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Truncate the database table
   * @returns {Promise}
   */
  clear = async () => {
    try {
      return await pool.query(`TRUNCATE users RESTART IDENTITY CASCADE;`);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * @param {String} text
   * @returns {Promise<QueryResult>}
   */
  query = async text => {
    try {
      return await pool.query(text);
    } catch (error) {
      return error;
    }
  };
}

const db = new Database();

export default db;
