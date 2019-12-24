import "dotenv-config";
import moment from "moment";
import user from "../models/User";
import auth from "../middleware/Auth";
import response from "../helpers/apiResponses";
import validator from "../helpers/validators";
import db from "../helpers/db";

class Users {
  /**
   * @param {JSON} req
   * @param {JSON} res
   * @returns {Promise<JSON>}
   */
  register = async (req, res) => {
    const { email, password } = req.body;
    const dateCreated = moment().format();
    const dateModified = moment().format();

    if (!email || !password) {
      response.errorMessage(res, 400, "Some values are missing");
    }
    if (!validator.isEmailValid(email)) {
      response.errorMessage(res, 400, "Please enter a valid email");
    }

    const hashedPassword = auth.hashPassword(password);

    try {
      let { rows } = await db.query(user.getUser(email));
      if (rows[0]) {
        response.errorMessage(res, 409, "Email already registered");
      } else {
        await db.query(
          user.createUser(email, hashedPassword, dateCreated, dateModified)
        );
        let { rows } = await db.query(user.getUser(email));
        response.successWithData(res, 201, {
          status: 201,
          message: "User successfully created",
          user: rows[0]
        });
      }
    } catch (error) {
      if (error.routine === "_bt_check_unique") {
        response.errorMessage(res, 409, "Email already registered");
      }
    }
  };

  /**
   * @param {JSON} req
   * @param {JSON} res
   * @returns {Promise<JSON>}
   */
  login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      response.errorMessage(res, 400, "Missing email or password");
    }
    if (!validator.isEmailValid(email)) {
      response.errorMessage(res, 400, "Invalid email address");
    }
    try {
      console.log(rows);
      const { rows } = await db.query(user.getUser(email));
      if (!rows[0]) {
        response.errorMessage(res, 401, "Email not registered");
      } else if (auth.comparePassword(password, rows[0].password) === false) {
        response.errorMessage(res, 401, "Wrong password");
      } else {
        response.successWithData(res, 200, {
          status: 200,
          message: "Login successful",
          token: auth.generateJsonWebToken(rows[0].id, rows[0].email)
        });
      }
    } catch (error) {
      response.errorMessage(res, 400, error);
    }
  };
}
const users = new Users();
export default users;
