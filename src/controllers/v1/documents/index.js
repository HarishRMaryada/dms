const { create, list } = require("./documents");
const documentRoutes = [
  {
    method: "post",
    path: "/",
    controller: create,
  },
  {
    method: "get",
    path: "/",
    controller: list,
  },
];

module.exports = documentRoutes;
