const Documents = require("src/models/documents");

const create = async (req, res, next) => {
  const {file} = req
  res.data = { up:"uploaded" ,file};
  next();
};

module.exports = { create };
