const DocumentModel = require("src/models/documents");
const { gfsCollection } = require("src/utils/initdb");
const upload = require("src/middleware/upload");
const multer = require("multer");

const createFolder = async (req, res, next) => {
  const { name } = req.body;
  const {
    user: { _id },
  } = req;
  const folder = await DocumentModel.createFolder(name, _id);
  res.data = { up: "uploaded", folder };
  next();
};

const insertFileInFolder = async (req, res, next) => {
  let folder = await DocumentModel.findFolder(req.params.folderId);
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
    } else if (folder.files && folder.files.length > 1) {
      next(new Error("One File already exists in this folder"));
    }
    const { file } = req;
    folder.files.push(file.id);
    await folder.save();
    res.data = { file };
    next();
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

const list = async (req, res, next) => {
  let gfs = gfsCollection(`${req.user._id}-documents`);
  gfs.files.find({}).toArray(function (err, files) {
    if (err) console.log(err);
    res.data = files;
    next();
  });
};

const foldersList = async (req, res, next) => {
  const {
    user: { _id },
  } = req;
  const folder = await DocumentModel.foldersList(_id);
  res.data = { folder };
  next();
};
module.exports = {
  createFolder,
  insertFileInFolder,
  insertFile,
  list,
  foldersList,
};
