import "dotenv-config";
import jwt from "jsonwebtoken";
import db from "../helpers/db";
import user from "../models/User";
import bcrypt from "bcrypt";

class Auth {
  /**
   * @param {Number} id
   * @param {String} email
   * @returns {String}
   */
  generateJsonWebToken = (id, email) => {
    const token = jwt.sign(
      {
        id: id,
        email: email
      },
      process.env.SECRET_KEY,
      { expiresIn: 60 * 15 }
    );
    return token;
  };

  /**
   * @param {String} password
   * @returns {String}
   */
  hashPassword = password => {
    return bcrypt.hashSync(password, 10);
  };

  /**
   * @param {String} password
   * @param {String} hashedPassword
   */
  comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compareSync(password, hashedPassword);
  };

  /**
   * @param {JSON} req
   * @param {JSON} res
   * @returns {Promise<JSON>}
   */
  verify = async (req, res, next) => {
    if (typeof req.headers["authorization"] === "undefined") {
      return res
        .status(401)
        .send({ status: 401, message: "Missing  access token in header" });
    }
    const token = req.headers["authorization"].replace("Bearer ", "");
    try {
      const decoded = await jwt.verify(token, process.env.SECRET_KEY);
      const { rows } = await db.query(user.getUser(decoded.email));
      if (!rows[0]) {
        return res.status(401).send({ status: 401, message: "Invalid token" });
      }
      req.email = decoded.email;
      next();
    } catch (error) {
      return res.status(401).send({ status: 401, message: error.message });
    }
  };
}

const auth = new Auth();

export default auth;
