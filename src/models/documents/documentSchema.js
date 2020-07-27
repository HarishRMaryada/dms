const mongoose = require("mongoose");
const baseUtils = require("../baseSchema");

const document = {
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  files: [{ type: mongoose.Schema.Types.ObjectId }],
};

const DocumentSchema = baseUtils.timeStamps(document);
const DocumentModel = mongoose.model("document", DocumentSchema);

module.exports = DocumentModel;
