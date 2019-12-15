import express from "express";
import user from "../controllers/users";
const route = express.Router();

route.post("/login", user.login);
route.post("/register", user.register);

export default route;
