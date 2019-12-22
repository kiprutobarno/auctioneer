import "dotenv-config";
import moment from "moment";
import owner from "../models/Owner";
import jwt from "jsonwebtoken";
import response from "../helpers/apiResponses";
import validator from "../helpers/validators";
import db from "../helpers/db";

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
      response.errorMessage(res, 400, "Some values are missing");
    }
    if (!validator.isEmailValid(email)) {
      response.errorMessage(res, 400, "Please enter a valid email");
    }
    try {
      let { rows } = await db.query(owner.getOwner(email));
      if (rows[0]) {
        response.errorMessage(res, 409, "Owner already registered");
      } else {
        await db.query(
          owner.createOwner(
            firstName,
            lastName,
            email,
            createdBy,
            dateCreated,
            dateModified
          )
        );
        let { rows } = await db.query(owner.getOwner(email));
        response.successWithData(res, 201, {
          status: 201,
          message: "User successfully created",
          owner: rows[0]
        });
      }
    } catch (error) {
      response.errorMessage(res, 400, error);
    }
  };

  getOwners = async (req, res) => {
    try {
      let { rows } = await db.query(owner.getOwners());
      if (Object.keys(rows).length === 0) {
        response.errorMessage(res, 404, "No owner records found");
      }
      response.successWithData(res, 200, {
        status: 200,
        message: "Success",
        owners: rows
      });
    } catch (error) {
      response.errorMessage(res, 400, error);
    }
  };
}

const owners = new Owners();
export default owners;
