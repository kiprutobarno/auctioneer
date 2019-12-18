import "@babel/polyfill";
import express from "express";
import bodyParser from "body-parser";
import config from "../config";
import users from "./routes/users";
import auth from "../src/middleware/Auth";
import owners from "./routes/owners";

const app = express();
const prefix = config.api.prefix;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PATCH, PUT, DELETE"
  );
  next();
});

/**Unprotected routes */
app.use(prefix, users);

/**Protected routes */
app.use(prefix, auth.verify, owners);

app.listen(config.PORT, () => {
  console.log(`server running on port ${config.PORT} `);
});

export default app;
