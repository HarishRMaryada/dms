const express = require("express");
const router = express.Router();
const { lstatSync, readdirSync } = require("fs");
const { join } = require("path");
const tryCatch = require("src/middleware/tryCatch");
const auth = require("src/middleware/auth")


const isDirectory = (source) => lstatSync(source).isDirectory();
const getDirectories = (source) =>
  readdirSync(source)
    .map((name) => join(source, name))
    .filter(isDirectory);

const controllers = (app) => {
  let allRoutes = [];
  const dirArray = getDirectories("src/controllers");
  if (dirArray && dirArray.length > 0) {
    dirArray.forEach((element) => {
      const values = getDirectories(element);
      if (values && values.length > 0) {
        values.forEach((ele) => {
          const routes = require(ele);
          routes.forEach((route) => {
            let path = "/api/" + ele + "" + route.path;
            path = path.replace("/src/controllers", "");
            allRoutes.push({
              path: path,
              method: route.method,
              controller: route.controller,
            });
          });
        });
      }
    });
  }

  for (let route of allRoutes) {
    switch (route.method) {
      case "get":
        router.get(route.path,auth,tryCatch(route.controller));
        break;
      case "post":
        router.post(route.path,auth,tryCatch(route.controller));
        break;
      case "put":
        router.put(route.path,auth, tryCatch(route.controller));
        break;
      case "patch":
        router.patch(route.path,auth, tryCatch(route.controller));
        break;
    }
  }
  app.use("/", router);
  app.use(require("src/middleware/success"));
  app.use(require("src/middleware/error"));
};
module.exports = controllers;
