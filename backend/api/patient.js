const Patient = require("mongoose").model("Patient");
let express = require("express");
let router = express.Router();
let utils = require("../utils/AuthUtills");
const { json } = require("express");
require("dotenv").config();

module.exports = router;
