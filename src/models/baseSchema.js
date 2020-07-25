const mongoose = require("mongoose");
const _ = require("lodash")
const Schema = mongoose.Schema;


const schema = {
    createdAt: { type: Date, default: Date.now },
    createdBy: Schema.Types.ObjectId,
    modifiedAt: { type: Date, default: Date.now },
    modifiedBy: Schema.Types.ObjectId
}
const timeStamps = (doc) => {
    return new Schema(_.assign(schema, doc));
}

module.exports = { timeStamps };