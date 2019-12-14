import "dotenv-config";
import moment from "moment";
import user from "../models/User";
import helpers from "../utils/helper";

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
      return res.status(400).send({ message: "Some values are missing" });
    }
    if (!helpers.isEmailValid(email)) {
      return res.status(400).send({ message: "Please use a valid email" });
    }

    const hashedPassword = helpers.hashPassword(password);

    try {
      await helpers.query(
        user.createUser(email, hashedPassword, dateCreated, dateModified)
      );
      let { rows } = await helpers.query(user.getUser(email));
      return res.status(201).send({
        status: 201,
        message: "User successfully created",
        user: rows[0],
        token: helpers.generateJsonWebToken(rows[0].id, rows[0].email)
      });
    } catch (error) {
      return res.status(400).send({ message: "error", error: error });
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
      return res
        .status(400)
        .send({ status: 400, message: "Missing email or password" });
    }
    if (!helpers.isEmailValid(email)) {
      return res
        .status(400)
        .send({ status: 400, message: "Invalid email address" });
    }
    try {
      const { rows } = await helpers.query(user.getUser(email));
      if (!rows[0]) {
        return res
          .status(401)
          .send({ status: 401, message: "Email not registered" });
      } else if (!helpers.comparePassword(password, rows[0].password)) {
        return res.status(401).send({ status: 401, message: "Wrong password" });
      } else {
        return res.status(200).send({
          status: 200,
          message: "Login successful",
          token: helpers.generateJsonWebToken(rows[0].email)
        });
      }
    } catch (error) {
      res.status(400).send({ status: 400, message: "Error" });
      return;
    }
  };
}
const users = new Users();
export default users;
