import express from "express";
import owners from "../controllers/owners";
const route = express.Router();

route.post("/owners", owners.createOwner);
route.get("/owners", owners.getOwners);

export default route;
