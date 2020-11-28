let mongoose = require("mongoose");
let User = require("mongoose").model("User");
const { Decimal128, Int32 } = require("mongodb");

var userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  hash: { type: String },
  salt: { type: String },
  dob: {
    day: { type: String, required: true },
    month: { type: String, required: true },
    year: { type: String, required: true },
  },
  gender: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  role: { type: String, default: "therapist" },
  user_data: {
    charges: { type: Number, required: true },
    currency: { type: String, required: true },
    therapistType: { type: String, required: true },
    experience: { type: Number, required: true },
    description: { type: String, required: true },
  },
});

userSchema.statics.ShowAllTherapists = function (conditions) {
  if (conditions) {
    if (conditions.hash) conditions.hash = undefined;
    if (conditions.salt) conditions.salt = undefined;
  }
  return new Promise((resolve, reject) =>
    Therapist.find({ ...conditions, role: "therapist" }, function (
      err,
      result
    ) {
      if (err) reject(err);
      else resolve(result);
    })
  );
};

userSchema.statics.CreateTherapist = function (userDetails) {
  return new Promise((resolve, reject) => {
    let therapist;
    try {
      therapist = new Therapist(userDetails);
    } catch (err) {
      reject(err);
    }
    User.DoesUserExist({ email: userDetails.email }) === true
      ? reject("Account is Already Registered")
      : console.log("Creating New account");
    therapist
      .save()
      .then((doc) => resolve(therapist))
      .catch((err) => reject(err));
  });
};

var Therapist = mongoose.model("Therapist", userSchema, "users");

module.exports = Therapist;
