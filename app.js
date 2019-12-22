import "@babel/polyfill";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import config from "./config";
import users from "./routes/users";
import owners from "./routes/owners";
import auth from "./middleware/Auth";

const app = express();
const prefix = config.api.prefix;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

/**Unprotected routes */
app.use(prefix, users);

/**Protected routes */
app.use(prefix, auth.verify, owners);

app.listen(config.PORT, () => {
  console.log(`server running on port ${config.PORT} `);
});

export default app;
