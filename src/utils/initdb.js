const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const config = require("config");

const uri = `mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.dbName}`;
//connection
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose.connect(uri, options);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

let gfs;
db.once("open", function callback() {
  gfs = Grid(db.db, mongoose.mongo);
  gfs.collection("documents");
  console.log("Mongodb connection established");

});


function initial() {
  const { init } = require("src/models/users");
  init();
}
initial();

module.exports = {db,gfs}
