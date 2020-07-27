const DocumentModel = require("src/models/documents");
const upload = require("src/middleware/upload");
const multer = require("multer");

const createFolder = async (req, res, next) => {
  const { name } = req.body;
  const {
    user: { _id },
  } = req;
  const folder = await DocumentModel.createFolder(name, _id);
  res.data = { folder };
  next();
};

const insertFileInFolder = async (req, res, next) => {
  let folder = await DocumentModel.findFolder(req.params.id);
  if (!folder) {
    throw new Error("no folder exists with given id");
  }
  upload(req, res, async function (err) {
    if (req.fileValidationError) {
      next(new Error(req.fileValidationError));
    } else if (!req.file) {
      next(new Error("Please select an file to upload"));
    } else if (err instanceof multer.MulterError) {
      next(new Error(err));
    } else if (err) {
      next(new Error(err));
    } else if (folder && folder.files && folder.files[0]) {
      next(new Error("One File already exists in this folder"));
    } else {
      const { file } = req;
      let files = [];
      files.push(file.id);
      folder.files = files;
      await folder.save();
      res.data = { file };
      next();
    }
  });
};

const insertFile = async (req, res, next) => {
  upload(req, res, async function (err) {
    if (req.fileValidationError) {
      next(new Error(req.fileValidationError));
    } else if (!req.file) {
      next(new Error("Please select an file to upload"));
    } else if (err instanceof multer.MulterError) {
      next(new Error(err));
    } else if (err) {
      next(new Error(err));
    }
    const { file } = req;
    res.data = { file };
    next();
  });
};

const getAllFilesAndFolders = async (req, res, next) => {
  const {user: { _id },} = req;
  const folders = await DocumentModel.getAllFolders(_id);
  const files = await DocumentModel.getAllFiles(_id)
  res.data = { folders,files};
  next();
};

const getFilesInFolder = async (req, res, next) => {
  const { user: { _id }, } = req;
  res.data = await DocumentModel.getFilesInFolder(req.params.id, _id);
  next();
};

module.exports = {
  createFolder,
  insertFileInFolder,
  insertFile,
  getAllFilesAndFolders,
  getFilesInFolder,
};
