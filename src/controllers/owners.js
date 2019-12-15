import "dotenv-config";
import moment from "moment";
import owner from "../models/Owner";
import helpers from "../utils/helper";
import jwt from "jsonwebtoken";

class Owners {
  createOwner = async (req, res) => {
    const loggedUser = await jwt.verify(
      req.headers["authorization"].replace("Bearer ", ""),
      process.env.SECRET_KEY
    );
    const { firstName, lastName, email } = req.body;
    const createdBy = loggedUser.email;
    const dateCreated = moment().format();
    const dateModified = moment().format();
    if (!firstName || !lastName || !email) {
      return res.status(400).send({ status: 400, message: "Missing values" });
    }
    if (!helpers.isEmailValid(email)) {
      return res.status(400).send({ message: "Please enter a valid email" });
    }
    try {
      let { rows } = await helpers.query(owner.getOwner(email));
      if (rows[0]) {
        return res
          .status(409)
          .send({ statusCode: 409, message: "Owner already registered" });
      } else {
        await helpers.query(
          owner.createOwner(
            firstName,
            lastName,
            email,
            createdBy,
            dateCreated,
            dateModified
          )
        );
        let { rows } = await helpers.query(owner.getOwner(email));

        return res.status(201).send({
          status: 201,
          message: "Owner created successfully",
          owner: rows[0]
        });
      }
    } catch (error) {}
  };

  getOwners = async (req, res) => {
    try {
      let { rows } = await helpers.query(owner.getOwners());
      if (Object.keys(rows).length === 0) {
        return res.status(404).send({
          status: 404,
          message: "No owner records found"
        });
      }
      return res.status(200).send({
        status: 200,
        message: "Success",
        owners: rows
      });
    } catch (error) {}
  };
}

const owners = new Owners();
export default owners;
