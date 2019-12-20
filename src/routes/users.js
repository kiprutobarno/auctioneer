import express from "express";
import user from "../controllers/UserController";
const route = express.Router();

route.post("/login", user.login);
route.post("/register", user.register);

export default route;
