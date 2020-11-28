var express = require("express");

module.exports = function (app) {
  //Formating Json Output
  app.set("json spaces", 4);
  app.use(express.json());
};
