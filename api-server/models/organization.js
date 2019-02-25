const bcrypt   = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const mongooseHandle = require('../config/database').connection;
var ObjectId = mongoose.Schema.Types.ObjectId;
const organizationSchema = new mongoose.Schema({
      name         : String,
      address      : String,
      created      : Date,
      active       : Boolean,
      profile      : String,
      users        : [ObjectId]
},
{
    collection: "organizations",
    timestamps: true
});
