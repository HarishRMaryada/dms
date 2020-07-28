const {
  insertFileInFolder,
  createFolder,
  getAllFilesAndFolders,
  insertFile,
  getFilesInFolder,
  modeFilesInBetweenFolders
} = require("./documents");
const documentRoutes = [
  //folder related operations
  {
    method: "post",
    path: "/",
    controller: createFolder,
  },
  {
    method: "post",
    path: "/:id/files",
    controller: insertFileInFolder,
  },
  {
    method: "get",
    path: "/:id",
    controller: getFilesInFolder,
  },
  {
    method: "get",
    path: "/:fromId/to/:toId",
    controller: modeFilesInBetweenFolders,
  },
  //files
  {
    method: "post",
    path: "/files",
    controller: insertFile,
  },
  //complete users drive related operations
  {
    method: "get",
    path: "/",
    controller: getAllFilesAndFolders,
  },
];

module.exports = documentRoutes;
