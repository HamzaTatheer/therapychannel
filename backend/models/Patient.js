let mongoose = require("mongoose");
let User = require("mongoose").model("User");
const { Decimal128, Int32 } = require("mongodb");

var userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "UserName missing"] },
  email: { type: String, required: [true, "email missing"] },
  hash: { type: String },
  salt: { type: String },
  dob: {
    day: { type: String, required: [true, "dob day missing"] },
    month: { type: String, required: [true, "dob month missing"] },
    year: { type: String, required: [true, "dob year missing"] },
  },
  gender: { type: String, required: [true, "gender missing"] },
  country: { type: String, required: [true, "country missing"] },
  city: { type: String, required: [true, "city missing"] },
  role: {
    type: String,
    default: "patient",
  },
});

userSchema.statics.CreatePatient = function (userDetails) {
  return new Promise((resolve, reject) => {
    let patient;
    try {
      patient = new Patient(userDetails);
    } catch (err) {
      reject(err);
    }
    User.DoesUserExist({ email: userDetails.email }) === true
      ? reject("Account is Already Registered")
      : console.log("Creating New account");
    patient
      .save()
      .then((doc) => resolve(patient))
      .catch((err) => reject(err));
  });
};

var Patient = mongoose.model("Patient", userSchema, "users");

module.exports = Patient;
