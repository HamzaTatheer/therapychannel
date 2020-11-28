const dotenv = require("dotenv").config();
const Therapist = require("mongoose").model("Therapist");
var express = require("express");
var router = express.Router();
const passport = require("passport");

var utils = require("../utils/AuthUtills");

router.get(
  "/show_therapists",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    //if req.body is empty. show all or else show by preference.
    const { conditions } = req.body;
    return Therapist.ShowAllTherapists(conditions)
      .then((result) => res.json(result))
      .catch((err) => res.status(405).json(err.toString()));
  }
);

module.exports = router;
