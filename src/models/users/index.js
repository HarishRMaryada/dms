const _ = require("lodash");
const UserModel = require("./userSchema");

const findOneByEmail = async (email) => {
  return await UserModel.findOne({ email: email });
};


const create = async (doc) => {
  const user = new UserModel(doc);
  return await user.save();
};

module.exports = { findOneByEmail, create };
