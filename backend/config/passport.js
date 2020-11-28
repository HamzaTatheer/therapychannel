var passport = require("passport");
require("dotenv").config();
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const options = {};

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.KEY;
var strategy = new JwtStrategy(jwtOptions, function (payload, next) {
  const User = require("mongoose").model("User");
  let user = User.DoesUserExist({ _id: payload.sub });
  user ? next(null, { id: payload.sub }) : next(null, false);
});

module.exports = function (app) {
  passport.use(strategy);
  app.use(passport.initialize());
};
