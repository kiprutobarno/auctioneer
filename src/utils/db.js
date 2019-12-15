import { Pool } from "pg";
import config from "../../config";

const pool = new Pool({ connectionString: config.DATABASE_URL });

/**Database  */
class Database {
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
}

const database = new Database();

export default database;
