import express from "express";
import user from "../controllers/users";
const route = express.Router();

route.post("/register", user.register);

export default route;
