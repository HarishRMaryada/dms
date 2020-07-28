const mongoose = require("mongoose");
const config = require("config");
const _ = require("lodash")

const loadModels = () => {
  require("src/models/users/userSchema")
  require("src/models/documents/documentSchema")
}

const start = (eventEmitter) => {
  loadModels();
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
    eventEmitter.emit('db-connected');
  });
}

const seedData = (eventEmitter) => {
  const models = {
    users: require("src/models/users/userSchema"),
    documents: require("src/models/documents/documentSchema").DocumentModel
  }


  models.users.countDocuments({}, (err, docs) => {
    if (err) throw new Error('db load count error')
    if (docs === 0) {
      const seedUser = [
        {
          email: "test@test.com",
          password: "test",
        },
        {
          email: "user@user.com",
          password: "user",
        },
      ];
      models.users.insertMany(seedUser, function (error, docs) {
        if (error) {
          console.log(error)
          throw new Error('Create user seed user failed')
        }
        else {
          eventEmitter.emit('seeded-data')
        }
      })
    } else {
      eventEmitter.emit('seeded-data')
    }
  })
}

module.exports = { start, seedData };
