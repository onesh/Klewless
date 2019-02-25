const bcrypt   = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const mongooseHandle = require('../config/database').connection;

// error code and text to be brought from a map
var ObjectId = mongoose.Schema.Types.ObjectId;
let validator = (function () {
let isValid = 0;
let validate = function (obj) {
  if (!obj.value) {
    obj.errorCode= 1,
    obj.errorText= "Cannot be left blank"
    --isValid;
  } else {
    obj.errorCode= '';
    obj.errorText= '';
  }

}
let unsetIsvalid = function () {
  isValid = 0;
}
let validator = function (vals) {

  vals.forEach( (elem) => {


    if (elem && !elem.filter && typeof elem == 'object') {
      validate(elem);
      console.log(isValid, elem);
    }

    else if (elem && elem.filter) validator (elem)

  })

  return isValid;
}
return {
  validator: validator,
  unsetIsvalid: unsetIsvalid
};

})()


const questionSchema = new mongoose.Schema({

      id              : String,
      name            : String,
      isused          : {type: Boolean, required: true, default: false},
      createdDate     : {type: Date, required: false, default: new Date()},
      createdBy       : ObjectId,
      lastUpdatedDate : Date,
      lastUpdatedBy   : ObjectId,
      store           : {
          type: Object,
          validate: {
          validator: function (store){
            store = store.model;

            if (this['isused']) {
                let isValid = validator.validator([store.question, store.options]) == 0;
                validator.unsetIsvalid();
                return isValid;
            }

            else return true;
          },
          message: `Empty fields not allowed!`
    },
      }
    },
{
    collection: "question",
    timestamps: true
});

var questionModel = mongooseHandle.model('Question', questionSchema);


module.exports = questionModel;
