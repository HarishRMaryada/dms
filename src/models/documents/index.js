const DocumentModel = require("./documentSchema");
const _ = require("lodash");

const findFolder = async (id) => {
  return await DocumentModel.findOne({_id:id});
};

const createFolder = async (name, user) => {
  let folder = await DocumentModel.findOne({ name: name, user: user });
  if (folder) {
    throw new Error("Foldername already exists");
  }
  folder = new DocumentModel({ user: user, name: name });
  return await folder.save();
};


const foldersList = async (user) => {
  return await DocumentModel.find({ user: user });
};

module.exports = { createFolder, foldersList, findFolder };
