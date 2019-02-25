const dlModel = require("../models/dl");
const mongoose = require("mongoose");

class DL {
  constructor() {}

  deleteDl(req, res) {
    let dl_id = req.params.id;

    dlModel.deleteOne({ _id: dl_id }, function(err) {
      if (err) {
        res.status(401).send({
          message: "could not load delete dl for user with id" + req.user._id,
          error: err
        });
      } else {
        res.status(200).send({
          message: "deleted dl for user with id" + req.user._id
        });
      }
    });
  }

  readDl(req, res) {
    let id = req.params.id;
    if (!id) {
      // get all DLs
      dlModel
        .find({})
        .populate("user")
        .exec(function(err, dls) {
          if (err) {
            res.status(401).send({
              message:
                "could not load list of all test for this user" +
                req.user.email,
              error: err
            });
          } else {
            res.status(200).send(dls);
          }
        });
    } else {
      id = mongoose.Types.ObjectId(id);
      dlModel
        .findOne({ _id: id })
        .populate("user")
        .exec(function(err, dl) {
          if (err) {
            res.status(401).send({
              message: "could not find the test with this id: " + id,
              error: err
            });
          } else {
            res.status(200).send(dl);
          }
        });
    }
  }

  updateDl(req, res) {
    let payload = req.body;
    let emails = (payload.values || "").split(",");
    if (emails.length > 1) {
      emails = (function(emails) {
        let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        emails = emails.filter(email => {
          email = email.trim();
          return re.test(String(email).toLowerCase());
        });
        return emails;
      })(emails);
    }

    dlModel.findById(payload._id, function(err, dl) {
      if (err) {
        res.status(401).send({
          error: err
        });
      } else {
        dl.values = emails;
        dl.name = payload.name;
        dl.save(function(error, dl) {
          if (error) {
            res.status(401).send({
              message: `${"Error couldn't update with id " + payload._id}`,
              success: false,
              error: error
            });
          } else {
            res.status(200).send({
              message: `${"updated " + payload.name + "dl to DB"}`,
              success: true,
              data: dl
            });
          }
        });
      }
    });
  }

  createDl(req, res) {
    let payload = {
      name: req.body.name,
      created: new Date(),
      updated: new Date(),
      values: "true",
      updatedby: req.user._id,
      count: 0
    };

    dlModel.create(payload, function(error, dl) {
      if (error) {
        res.status(401).send({
          message: "Error while saving dl to Database",
          success: false,
          error: error
        });
      } else {
        res.status(200).send({
          message: "saved dl to DB",
          success: true,
          data: dl
        });
      }
    });
  }
}

module.exports = new DL();
