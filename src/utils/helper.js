import "dotenv-config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

class Helpers {
  query = text => {
    return new Promise((resolve, reject) => {
      pool
        .query(text)
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
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
  generateJsonWebToken = (id, email) => {
    const token = jwt.sign(
      {
        userId: id,
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
