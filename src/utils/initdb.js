const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const config = require("config");

const uri = `mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.dbName}`;
//connection
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose.connect(uri, options);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function callback() {
  console.log("Mongodb connection established");
});

// function initial() {
//   const { init } = require("src/models/users");
//   init();
// }
// initial();

const gfsCollection = () => {
  let gfs;
  gfs = Grid(db.db, mongoose.mongo);
  gfs.collection("documents");
  return gfs;
};

module.exports = { gfsCollection };
