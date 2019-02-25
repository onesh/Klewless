const bcrypt = require("bcrypt-nodejs");
const mongoose = require("mongoose");
const mongooseHandle = require("../config/database").connection;
var ObjectId = mongoose.Schema.Types.ObjectId;

const testSchema = new mongoose.Schema(
  {
    id: String,
    created: { type: Date, required: true, default: new Date() },
    updated: { type: Date, required: true, default: new Date() },
    user: { type: ObjectId, ref: "User", required: true },
    components: [],
    stores: [{ type: ObjectId, ref: "Question" }], // components stores
    responseCount: { type: Number, required: true, default: 0 },
    testLink: { type: String, required: false, default: "" },
    responses: {
      type: Map, // [{response}, {response}, {response}, {response}]
      of: Array
    },
    meta: {
      type: Map,
      of: mongoose.Schema.Types.Mixed
    }
  },
  {
    collection: "tests",
    timestamps: true
  }
);

var testModel = mongooseHandle.model("Test", testSchema);

module.exports = testModel;
