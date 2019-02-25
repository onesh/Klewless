const bcrypt   = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const mongooseHandle = require('../config/database').connection;
var ObjectId = mongoose.Schema.Types.ObjectId;
const userSchema = new mongoose.Schema({

      email        : String,
      password     : String,
      organization : ObjectId,
      created      : Date,
      active       : Boolean,
      profile      : String,
      tests        : [ObjectId],
      role         : {type: String, required: true, default: 'admin'}
},{
    collection: "users",
    timestamps: true
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
var userModel = mongooseHandle.model('User', userSchema);
    var user = new userModel();
    user.email ='vanshkhanna27@gmail.com',
    user.password = user.generateHash('vansh');
    user.save(function (err) {
      if (err) console.log(err);
      // saved!
    });

    

module.exports = userModel;
