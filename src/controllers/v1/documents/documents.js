const Documents = require("src/models/documents");
const { gfsCollection } = require("src/utils/initdb");

const create = async (req, res, next) => {
  const { file } = req;
  res.data = { up: "uploaded", file };
  next();
};
const list = async (req, res, next) => {
  let gfs = gfsCollection(`${req.user._id}-documents`);
  gfs.files.find({}).toArray(function (err, files) {
    if (err) console.log(err);
    res.data = files;
    next();
  });
};

module.exports = { create, list };
