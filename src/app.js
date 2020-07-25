const config = require("config");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

if (!config.get("jwtPrivateKey")) {
  console.error("Fatal error: jwtPrivateKey not defined");
  process.exit(1);
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
process.on("uncaughtException", (ex) => console.log(ex));
process.on("unhandledRejection", (e) => console.log(e));

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

const uri = `mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.dbName}`;
mongoose.connect(uri, options);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
  console.log("Mongodb connection established");
});

function initial() {
  const { init } = require("src/models/users");
  init();
}
initial();

require("src/controllers")(app);

module.exports = app;
