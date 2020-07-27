const mongoose = require("mongoose");
const baseUtils = require("../baseSchema");

const documentFiles = mongoose.model("documentFile", new mongoose.Schema({}, {strict: false}), "documents.files" );


const document = {
  name: {
    type: String,
    required: true,
    unique:true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: "User",
  },
  files: [{ type: mongoose.Schema.ObjectId, ref: "documentFile" }],
};

const DocumentSchema = baseUtils.timeStamps(document);
const DocumentModel = mongoose.model("document", DocumentSchema);

module.exports = {DocumentModel,documentFiles};
