const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const config = require("config");

const uri = `mongodb://${config.mongo.host}:${config.mongo.port}/${config.mongo.dbName}`;
const storage = new GridFsStorage({
    url: uri,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        const filename = file.originalname;
          const fileInfo = {
            filename: filename,
            bucketName: "documents",
          };
          resolve(fileInfo);
      });
    },
  });
  
  const upload = multer({ storage }).single('file');

  module.exports = upload