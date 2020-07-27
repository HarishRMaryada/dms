const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const baseUtils = require("../baseSchema");

const user = {
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
};
const UserSchema = baseUtils.timeStamps(user);

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
};

UserSchema.methods.generateAuthToken = async function () {
  return await jwt.sign(
    { _id: this._id, email: this.email },
    config.get("jwtPrivateKey")
  );
};

const UserModel = mongoose.model("user", UserSchema);

module.exports = UserModel;
