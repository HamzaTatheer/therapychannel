let mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const server = process.env.db_server; // REPLACE WITH YOUR DB SERVER
const database = process.env.db_name; // REPLACE WITH YOUR DB NAME

module.exports = function () {
  mongoose
    .connect(`mongodb://${server}/${database}`, { useNewUrlParser: true })
    .then((res) => {
      console.log("Database connection successful");
    })
    .catch((err) => {
      console.log(err);
      console.error("Database connection error");
    });
};
