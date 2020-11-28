let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
const User = require("mongoose").model("User");
const Therapist = require("mongoose").model("Therapist");
const utils = require("../utils/AuthUtills");
const passport = require("passport");
const ChatUtills = require("../utils/ChatUtills");
const DynamicChat = require("../models/DynamicChat");

router.post("/login", async function (req, res) {
  const { email, password } = req.body;
  let user;
  let hash;
  let salt;
  console.log(email, password);

  user = await User.DoesUserExist({ email });
  if (user) {
    hash = user.hash;
    salt = user.salt;
    console.log(user);
  } else {
    return res
      .status(405)
      .json({ error: "There is no user registered with the following email" });
  }

  if (!hash || !salt) {
    return res.status(405).json({ error: "Object Does not have hash or salt" });
  }

  if (utils.validPassword(password, hash, salt) == true) {
    const JWT = utils.issueJWT(user);
    utils.removeUserSecrets(user);
    return res.json({
      sucess: true,
      user: user,
      token: JWT.token,
      expiresIn: JWT.expires,
    });
  } else {
    return res.send("Wrong Password. Please try Again");
  }
});

router.post("/register_therapist", async function (req, res) {
  const {
    name,
    email,
    password,
    dob,
    gender,
    city,
    country,
    user_data,
  } = req.body;
  const { hash, salt } = utils.genPassword(password);
  return Therapist.CreateTherapist({
    name,
    email,
    hash,
    salt,
    gender,
    city,
    country,
    dob,
    user_data,
  })
    .then((therapist) => {
      const JWT = utils.issueJWT(therapist);
      utils.removeUserSecrets(therapist);
      res.json({
        sucess: true,
        user: therapist,
        token: JWT.token,
        expiresIn: JWT.expires,
      });
    })
    .catch((error) => {
      res.json({ error: error.toString() });
    });
});

router.post("/register_patient", async function (req, res) {
  const { name, email, password, dob, gender, city, country } = req.body;
  const { hash, salt } = utils.genPassword(password);
  return Patient.CreatePatient({
    name,
    email,
    hash,
    salt,
    gender,
    city,
    country,
    dob,
  })
    .then((patient) => {
      const JWT = utils.issueJWT(patient);
      utils.removeUserSecrets(patient);
      res.json({
        sucess: true,
        user: patient,
        token: JWT.token,
        expiresIn: JWT.expires,
      });
    })
    .catch((error) => {
      res.json({ error: error.toString() });
    });
});

module.exports = router;
