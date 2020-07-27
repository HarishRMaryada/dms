const {
  insertFileInFolder,
  createFolder,
  list,
  foldersList,
  insertFile,
} = require("./documents");
const documentRoutes = [
  {
    method: "post",
    path: "/files/:folderId",
    controller: insertFileInFolder,
  },
  {
    method: "post",
    path: "/files",
    controller: insertFile,
  },
  {
    method: "post",
    path: "/folder",
    controller: createFolder,
  },
  {
    method: "get",
    path: "/",
    controller: list,
  },
  {
    method: "get",
    path: "/folder",
    controller: foldersList,
  },
];

module.exports = documentRoutes;
