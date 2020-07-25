const mongoose = require("mongoose");
const baseUtils = require("../baseSchema");

const document = {
    userId: {
        type: String,
        required: true,
    },
};

const DocumentSchema = baseUtils.timeStamps(document);
const DocumentModel = mongoose.model("document", DocumentSchema);

module.exports = DocumentModel;
