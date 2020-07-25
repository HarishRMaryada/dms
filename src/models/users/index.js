const _ = require("lodash");
const UserModel = require("./userSchema");
const { users } = require("src/utils/constants");

const findOneByEmail = async (email) => {
  return await UserModel.findOne({ email: email });
};

const init = async (doc) => {
  UserModel.estimatedDocumentCount(function (err, count) {
    if (!err && count === 0) {
      users.forEach((user) => {
        let doc = new UserModel(user);
        doc.save();
      });
    }
  });
};

const create = async (doc) => {
  const user = new UserModel(doc);
  return await user.save();
};

module.exports = { init, findOneByEmail, create };
