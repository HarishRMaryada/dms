const mongoose = require("mongoose");
const documentFiles = mongoose.model("documentFile", new mongoose.Schema({}, {strict: false}), "documents.files" );
const DocumentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
  },
  files: [{ type: mongoose.Schema.ObjectId, ref: "documentFile" }],
});

const DocumentModel = mongoose.model("document", DocumentSchema);

module.exports = {DocumentModel,documentFiles};
