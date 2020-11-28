let mongoose = require("mongoose");

var appointmentSchema = new mongoose.Schema({
  title: { type: String },
  date: { type: Date },
  timezone: { type: String },
});
