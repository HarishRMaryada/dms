const { create } = require("./documents");
const documentRoutes = [
    {
      method: "post",
      path: "/",
      controller: create,
    }
];
  
  module.exports = documentRoutes ;
