const config = require("config");
const express = require("express");
const methodOverride = require("method-override");

const app = express();

//middleware
app.use(express.json());
app.use(methodOverride("_method"));

if (!config.get("jwtPrivateKey")) {
  console.error("Fatal error: jwtPrivateKey not defined");
  process.exit(1);
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
process.on("uncaughtException", (ex) => console.log(ex));
process.on("unhandledRejection", (e) => console.log(e));

require("src/utils/initdb");

require("src/controllers")(app);

module.exports = app;
