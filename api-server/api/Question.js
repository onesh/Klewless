const testModel = require("../models/test");
const questionModel = require("../models/question");

const mongoose = require("mongoose");

class Question {
  constructor() {}

  createQuestion(req, res) {
    let payload = req.body;

    payload.createdBy = req.user._id;

    payload.lastUpdatedBy = req.user._id;
    payload.lastUpdatedDate = new Date();

    questionModel.create(payload, function(error, question) {
      if (error) {
        res.status(401).send({
          message: "Error while saving question to Database",
          success: false,
          error: error
        });
      } else {
        testModel.findById(payload.testId, function(error, test) {
          if (error) {
            res.status(401).send({
              message: `${"Error couldn't find test with id " +
                payload.testId +
                "while saving question to Database"}`,
              success: false,
              error: error
            });
          } else {
            test.stores.push(question._id);

            test.save(function(error, test) {
              if (error) {
                res.status(401).send({
                  message: `${"Error couldn't add question with id " +
                    question._id +
                    " to test with id " +
                    test._id}`,
                  success: false,
                  error: error
                });
              } else {
                res.status(200).send({
                  message: `${"saved " + payload.name + "type question to DB"}`,
                  success: true,
                  data: question
                });
              }
            });
          }
        });
      } 
    });
  }

  updateQuestion(req, res) {
    let store = req.body.question.store;
    let testId = req.body.testId;
    let question_id = req.body.id;

    questionModel.findById(question_id, function(error, question) {
      if (error) {
        res.status(401).send({
          message: `${"Error couldn't update question with id " +
            question._id}`,
          success: false,
          error: error            
        });
      } else {
        question.lastUpdatedBy = req.user._id;
        question.lastUpdatedDate = new Date();
        question.store = store;
        question.isused = true;

        question.save(function(error, question) {
          if (error) {
            res.status(401).send({
              message: `${"Error couldn't update question, probably you did not fill anyone of the fields"}`,
              success: false,
              error: error,
              value: error.errors.store.value

            });
            console.log("----", error, "----");
          } else {
            res.status(200).send({
              message: `${"saved " + question.name + "type question to DB"}`,
              success: true,
              data: question
            });
          }
        });
      }
    });
  }

  deleteQuestion(req, res) {
    let question_id = req.body.id;
    let testId = req.body.testId;

    testModel.findById(testId, function(err, test) {
      test.stores = test.stores.filter(id => id != question_id);

      test.save(function(err, test) {
        if (err) {
          res.status(401).send({
            message: `${"Error couldn't delete question with id " +
              question_id}`,
            success: false,
            error: error
          });
        } else {
          res.status(200).send({
            message: `${"deleted " + question_id + "from test " + testId}`,
            success: true,
            data: question_id
          });
        }
      });
    });
  }
}

module.exports = new Question();
