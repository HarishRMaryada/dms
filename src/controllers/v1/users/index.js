const { login,signup } = require("./users");
const userRoutes = [
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
module.exports = userRoutes;
