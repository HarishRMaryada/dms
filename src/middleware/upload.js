const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const config = require("config");
const _ = require("lodash");

const uri = `mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.dbName}`;
const storage = new GridFsStorage({
  url: uri,
  file: (req, file) => {
    console.log();
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: `${req.user._id}-documents`,
      };
      resolve(fileInfo);
    });
  },
});

module.exports = multer({ storage }).single("file");
