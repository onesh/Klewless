const bcrypt = require("bcrypt-nodejs");
const mongoose = require("mongoose");
const mongooseHandle = require("../config/database").connection;
var ObjectId = mongoose.Schema.Types.ObjectId;
const dlSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, default: "NA" },
    created: { type: Date, required: false, default: new Date() },
    updated: { type: Date, required: true, default: new Date() },
    values: {
      type: String,
      required: false,
      validate: {
        validator: function(value) {
          if (value == "true" || value == "") {
            this.values = "";
            return true;
          }
          let emails = value.split(",");
          let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
          let invalid_emails = emails.filter(email => {
            email = email.trim();
            return !re.test(String(email).toLowerCase());
          });
          return invalid_emails.length != emails.length;
        },
        message: "all the email ids are invalid"
      },
      updatedby: { type: ObjectId, required: true },
      count: { type: Number, required: true, default: 0 }
    }
  },
  {
    collection: "dls",
    timestamps: true
  }
);

var dlModel = mongooseHandle.model("DL", dlSchema);

module.exports = dlModel;
