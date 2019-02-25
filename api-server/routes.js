const Test = require("./api/Test");
const Question = require("./api/Question");
const Dl = require("./api/dl");
const EmailService = require("./services/emailService");

function routes(app, passport) {
  const isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      console.log("couldn't authenticate request");
    }
    res.redirect("/login");
  };
  const bypassAuthentication = function(req, res, next) {
    return next();
  };

  const routes = ["/login"];

  for (let i = 0; i < routes.length; i++) {
    app.post(
      routes[i],
      passport.authenticate("local-login", {
        successRedirect: "/", // redirect to the secure profile section
        failureRedirect: "/login", // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
      })
    );
  }

  app.get("/", isAuthenticated, function(req, res) {
    res.redirect("http://localhost:3030"); // ui redirect
    // Nginx > :7777 -> authenticate -> send index.html
  });

  app.post("/user", isAuthenticated, function(req, res) {
    const user = req.user;
    //delete values to not to be send to ui
    ["password"].forEach(key => {
      delete user[key];
    });
    res.status(200).send(req.user);
  });

  app.get("/login", function(req, res) {
    res.sendFile("login.html", { root: __dirname + "/public" });
  });

  app.get("/logout", function(req, res) {
    req.logout();
    res.send(200);
  });

  app.post("/saveTest", isAuthenticated, Test.saveTest);
  app.get("/getTest/:id/:execution?", bypassAuthentication, Test.getTest);
  app.post("/updateTest", isAuthenticated, Test.updateTest);
  app.post("/getAllTest", isAuthenticated, Test.getAllTest);

  app.post("/createQuestion", isAuthenticated, Question.createQuestion);
  app.post("/updateQuestion", isAuthenticated, Question.updateQuestion);
  app.post("/deleteQuestion", isAuthenticated, Question.deleteQuestion);

  app.post("/createDl", isAuthenticated, Dl.createDl);
  app.post("/updateDl", isAuthenticated, Dl.updateDl);
  app.get("/deleteDl/:id?", isAuthenticated, Dl.deleteDl);
  app.get("/readDl/:id?", isAuthenticated, Dl.readDl);

  app.post("/sendTestLinkToUsers", isAuthenticated, EmailService.sendEmail);
}
module.exports = routes;
