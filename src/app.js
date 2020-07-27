const config = require("config");
const express = require("express");
const methodOverride = require("method-override");
const events = require('events');
const eventEmitter = new events.EventEmitter();

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


const initDB = require("src/utils/initdb");
initDB.start(eventEmitter)

eventEmitter.once('db-connected', function () {
  initDB.seedData(eventEmitter)
});

eventEmitter.once('seeded-data', function () {
  start()
});
const start = ()=> {
  require("src/controllers")(app);
  app.listen(config.port, (err, res) => {
    console.log("listening on port", config.port);
  });
}

