const { login,signup } = require("./users");
const userCtrl = [
  {
    method: "post",
    path: "/token",
    controller: login,
  },
  {
    method: "post",
    path: "/signup",
    controller: signup,
  },
];
module.exports = userCtrl;
