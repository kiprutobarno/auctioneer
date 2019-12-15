import express from "express";
import user from "../controllers/users";
const route = express.Router();

route.post("/login", user.login);

export default route;
