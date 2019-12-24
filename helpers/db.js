import { Pool } from "pg";
import config from "../config";

const pool = new Pool({ connectionString: config.DATABASE_URL });

/**Database  */
class Database {
  /** Create table function
   * * @returns {Promise}
   */
  create = async (table, statement) => {
    try {
      await pool.query(`CREATE TABLE IF NOT EXISTS ${table}(${statement})`);
    } catch (error) {}
  };

  /** Drop table function
   * * @returns {Promise}
   */
  // drop = async table => {
  //   try {
  //     await pool.query(`DROP TABLE IF EXISTS ${table} CASCADE`);
  //   } catch (error) {}
  // };
  /** Create users table
   * * @returns {Promise}
   */
  createUsersTable = async () => {
    await this.create(
      "users",
      "id SERIAL PRIMARY KEY, email VARCHAR(50) UNIQUE NOT NULL, password VARCHAR(100) NOT NULL, dateCreated TIMESTAMP, dateModified TIMESTAMP"
    );
  };

  /**Drop users table
   ** @returns {Promise}
   */

  // dropUsersTable = async () => {
  //   await this.drop("users");
  // };

  /** Create owners table
   * * @returns {Promise}
   */
  createOwnersTable = async () => {
    await this.create(
      "owners",
      "id SERIAL PRIMARY KEY,firstName VARCHAR(50) NOT NULL,lastName VARCHAR(50) NOT NULL, email VARCHAR(50) UNIQUE NOT NULL,createdBy VARCHAR(50) REFERENCES users(email),dateCreated TIMESTAMP,dateModified TIMESTAMP"
    );
  };

  /**
   * * @returns {Promise}
   */
  // dropOwnersTable = async () => {
  //   this.drop("owners");
  // };

  /** Create owners table
   * * @returns {Promise}
   */
  createCategoriesTable = async () => {
    await this.create(
      "categories",
      "id SERIAL PRIMARY KEY,categoryName VARCHAR(50) NOT NULL,createdBy INTEGER REFERENCES users(id),dateCreated TIMESTAMP, dateModified TIMESTAMP"
    );
  };

  /**
   * * @returns {Promise}
   */
  // dropCategoriesTable = async () => {
  //   await this.drop("categories");
  // };

  /** Create items table
   * * @returns {Promise}
   */
  createItemsTable = async () => {
    await this.create(
      "items",
      "id SERIAL PRIMARY KEY,categoryId INTEGER REFERENCES categories(id),ownerId INTEGER REFERENCES owners(id),itemName VARCHAR(50) NOT NULL,createdBy INTEGER REFERENCES users(id),dateCreated TIMESTAMP,dateModified TIMESTAMP"
    );
  };

  /**
   * * @returns {Promise}
   */
  // dropItemsTable = async () => {
  //   await this.drop("items");
  // };

  /**
   * Truncate the database table
   * @returns {Promise}
   */
  clear = async table => {
    try {
      return await pool.query(`TRUNCATE ${table} RESTART IDENTITY CASCADE;`);
    } catch (error) {}
  };

  /**
   * @param {String} text
   * @returns {Promise<QueryResult>}
   */
  query = async text => {
    try {
      return await pool.query(text);
    } catch (error) {}
  };
}

const db = new Database();

export default db;
