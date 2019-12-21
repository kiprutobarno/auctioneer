import express from "express";
import user from "../controllers/userController";
const route = express.Router();

route.post("/login", user.login);
route.post("/register", user.register);

export default route;
