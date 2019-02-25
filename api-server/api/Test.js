const testModel = require("../models/test");
const mongoose = require("mongoose");

class Test {
  constructor() {}

  saveTest(req, res) {
    let payload = req.body;
    payload.user = req.user;
    let testLink = req.get("origin") + "/#/test/";
    console.log();

    testModel.create(payload, function(error, test) {
      if (error) {
        res.status(401).send({
          message: "Error while saving test to Database",
          success: false,
          error: error
        });
      } else {
        test.testLink = testLink + test._id;
        test.save((err, test) => {
          if (err) {
            res.status(401).send({
              message: "Error while saving test to Database",
              success: false,
              error: error
            });
          } else {
            res.status(200).send({
              message: "saved test to DB",
              success: true,
              data: test
            });
          }
        });
      }
    });
  }

  getTest(req, res) {
    let id = mongoose.Types.ObjectId(req.params.id);
    testModel
      .findOne({ _id: id })
      .populate("stores user")
      .exec(function(err, test) {
        if (err) {
          res.status(401).send({
            message: "could not find the test with this id: " + id,
            error: err
          });
        } else {
          console.log(req.params.execution);
          if (req.params.execution == "true") {
            test.stores.forEach(store => {
              store.store.showEditToggle = false;
              store.store.editable = false;
            });
          } else {
            test.stores.forEach(store => {
              store.store.showEditToggle = true;
              store.store.editable = true;
            });
          }
          res.status(200).send(test);
        }
      });
  }

  updateTest(req, res) {
    let payload = req.body;

    testModel.findByIdAndUpdate(
      payload._id,
      { $set: payload },
      { new: true },
      function(err, test) {
        if (err) {
          res.status(401).send({
            error: err
          });
        }
        res.status(200).send(test);
      }
    );
  }

  getAllTest(req, res) {
    testModel
      .find({ user: mongoose.Types.ObjectId(req.user._id) })
      .populate("stores user")
      .exec(function(err, tests) {
        if (err) {
          res.status(401).send({
            message:
              "could not load list of all test for this user" + req.user.email,
            error: err
          });
        } else {
          res.status(200).send(tests);
        }
      });
  }
}

module.exports = new Test();
