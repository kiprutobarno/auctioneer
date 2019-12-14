import { Pool } from "pg";
import config from "../../config";

const pool = new Pool({ connectionString: config.DATABASE_URL });

/**Database  */
class Database {
  createUsersTables = async () => {
    const client = await pool.connect();
    try {
      return await client.query(`CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            email VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            dateCreated TIMESTAMP,
            dateModified TIMESTAMP)`);
    } catch (error) {
      console.log(error);
    }
    client.release(true);
  };

  /**
   * Truncate the database table
   * @returns {Promise}
   */
  clear = async () => {
    const client = await pool.connect();
    try {
      return await client.query(`TRUNCATE users RESTART IDENTITY CASCADE;`);
    } catch (error) {
      console.log(error);
    }
    client.release(true);
  };

  dropUsersTable = async () => {
    client = await pool.connect();
    try {
      return await client.query(`DROP TABLE IF EXISTS users`);
    } catch (error) {
      console.log(error);
    }
    client.release(true);
  };
}

const database = new Database();

export default database;
