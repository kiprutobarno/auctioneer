import "dotenv-config";
import config from "../../config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Pool } from "pg";

const pool = new Pool({ connectionString: config.DATABASE_URL });
console.log(config.DATABASE_URL);

/**Class representing helper functions */
class Helpers {
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

  /**
   * @param {String} password
   * @returns {String}
   */
  hashPassword = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  };

  /**
   * @param {String} password
   * @param {String} hashedPassword
   */
  comparePassword = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
  };

  /**
   * @param {String} email
   */
  isEmailValid = email => {
    return /\S+@\S+\.\S+/.test(email);
  };

  /**
   * @param {Number} id
   * @param {String} email
   * @returns {String}
   */
  generateJsonWebToken = email => {
    const token = jwt.sign(
      {
        email: email
      },
      process.env.SECRET_KEY,
      { expiresIn: 60 * 15 }
    );
    return token;
  };
}

const helpers = new Helpers();

export default helpers;
