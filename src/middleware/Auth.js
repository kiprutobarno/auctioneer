import "dotenv-config";
import jwt from "jsonwebtoken";
import helpers from "../utils/helper";
import user from "../models/User";

class Auth {
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
      const { rows } = await helpers.query(user.getUser(decoded.email));
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
