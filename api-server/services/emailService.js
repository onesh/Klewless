const TestModel = require("../models/test");
const Dl = require("../models/dl");
const nodemailer = require("nodemailer");
// const mongoose = require("mongoose");

class EmailService {
  constructor() {}

  sendEmail(req, res) {
    let { dls, emails, testID, attachment, cc, bcc, testLink } = req.body;

    TestModel.findById(testID, function(err, test) {
      if (err) {
      } else {
        testLink = test.testLink;
      }
    })
      .then(function() {
        if (!!dls) {
          return Dl.findById(dls, function(err, dl) {
            if (err) {
              return Promise.reject(err);
            }
          });
        } else {
          return Promise.resolve();
        }
      })
      .then(() => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          service: "gmail",
          port: 587,
          secure: true, // true for 465, false for other ports
          auth: {
            user: "vanshkhanna27@gmail.com", // generated ethereal user
            pass: "whardphard" // generated ethereal password
          },
          authMethod: "login"
        });
        // setup email data with unicode symbols
        let mailOptions = {
          from: "vanshkhanna27@gmail.com", // sender address
          to: emails, // list of receivers
          subject: "You're Invited to fill a survey", // Subject line
          html: `${"please <a href=" +
            testLink +
            ">click here</a> to fill the survey"}` // html body
        };
        return transporter.sendMail(mailOptions);
      })
      .then(info => {
        console.log("Message sent: %s", info);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.status(200).send();
      })
      .catch(err => {
        res.status(500).send(err);
        console.log(err);
      });
  }
}

module.exports = new EmailService();
