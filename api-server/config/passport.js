var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var User = require('../models/user');

module.exports = function (app) {
  app.use(passport.initialize());
  app.use(passport.session()); // persistent login sessions

  // load up the user model

  passport.serializeUser(function(user, done) {
      done(null, user._id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
          done(err, user);
      });
  });



  passport.use('local-login', new LocalStrategy({
          usernameField : 'email',
          passwordField : 'password',
          passReqToCallback : true // allows us to pass back the entire request to the callback
      },
      function(req, email, password, done) {

          User.findOne({ 'email' :  email }, function(err, user) {
              if (err) {
                console.log(err);
                return done(err);
              }
              // if no user is found, return the message
              if (!user) {
                console.log('Err:User not found');
                return done(null, false, req.flash('loginMessage', 'No user found.'));
              }
              // req.flash is the way to set flashdata using connect-flash
              // if the user is found but the password is wrong
              if (!user.validPassword(password)) {
                console.log('Err:Invalid password');
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
              }
              // create the loginMessage and save it to session as flashdata
              // all is well, return successful user

              console.log('Success:Authenticated');
              return done(null, user);
          });
      }));

  return passport;

}
