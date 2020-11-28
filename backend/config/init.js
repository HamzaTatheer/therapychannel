const express = require("express"),
  cors = require("./cors"),
  io = require("./io"),
  enviorment = require("./enviorment"),
  models = require("./models"),
  database = require("./database"),
  passport = require("./passport"),
  expressjs = require("./expressjs"),
  routes = require("./routes");
const { model } = require("../models/User");
const { removeUserSecrets } = require("../utils/AuthUtills");

module.exports = function () {
  // Create instance of express
  var app = express();

  //Set up io communication

  io(app);

  //Allow cross origin access

  cors(app);

  //Set up enviorment varaibles

  enviorment(app);

  //Set up Database

  database(app);

  //Set up models

  models(app);

  //Set up and initialize passport

  passport(app);

  //Configure App according to express

  expressjs(app);

  //Configure all routes

  routes(app);

  return app;
};
