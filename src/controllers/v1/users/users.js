const UserModel = require("src/models/users");

const login = async (req, res, next) => {
  const user = await UserModel.findOneByEmail(req.body.email);
  if (!user) throw new Error("invalid email or password");
  const isValidPassword = await user.isValidPassword(req.body.password);
  if (!isValidPassword) throw new Error("Invalid email or pasword");
  const token = await user.generateAuthToken();
  res.header("token", token);
  res.data = { token };
  next();
};

const signup = async (req, res, next) => {
  if (!req.body.email && !req.body.password) {
    if (!user) throw new Error("email and password required");
  }
  let user = await UserModel.findOneByEmail(req.body.email);
  if (user) throw new Error("email already registered");
  user = await UserModel.create({ email: req.body.email, password: req.body.password });
  const token = await user.generateAuthToken();
  res.header("token", token);
  res.data = { token };
  next();
};

module.exports = { login, signup };
