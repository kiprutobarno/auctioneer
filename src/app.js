import "@babel/polyfill";
import express from "express";
import bodyParser from "body-parser";
import config from "../config";
import register from "./routes/register";
import login from "./routes/login";

const app = express();
const prefix = config.api.prefix;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "Server started successfully" });
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE"
  );
  next();
});

app.use(prefix, register);
app.use(prefix, login);

app.listen(config.PORT, () => {
  console.log(`server running on port ${config.PORT} `);
});

export default app;