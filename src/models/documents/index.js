const {DocumentModel,documentFiles} = require("./documentSchema");
const _ = require("lodash");

const findFolder = async (id) => {
  return await DocumentModel.findOne({ _id: id });
};

const createFolder = async (name, user) => {
  let folder = await DocumentModel.findOne({ name: name, user: user });
  if (folder) {
    throw new Error("Foldername already exists");
  }
  folder = new DocumentModel({ user: user, name: name });
  return await folder.save();
};

const getAllFolders = async (user) => {
  return await DocumentModel.find({ user: user }).populate("files");
};

const getAllFiles = async (user) => {
  let data = await DocumentModel.find({user:user}).select("files -_id")
  data = data.reduce((acc,cv)=>{
    return acc.concat(cv.files)
  },[])
  data = await documentFiles.find({user:user,_id:{$nin:[data]}})
  return data
};

const getFilesInFolder = async (folderId, userId) => {
  return await DocumentModel.findOne({ _id: folderId, user: userId }).populate("files")
};

module.exports = {
  createFolder,
  getAllFolders,
  getAllFiles,
  findFolder,
  getFilesInFolder,
};
