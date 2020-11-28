let express = require("express");
let router = express.Router();

router.get("/show_my_apppointments", function (req, res) {
  console.log("/showAllApppointments");
  const { date } = req.body;

  res.send("/showMyApppointments");
});

router.get("/start_appointment", function (req, res) {
  res.send("Starting Appointment");
});

router.get("/accept_appointment", function (req, res) {
  console.log("/acceptAppointment");
  //Change appointment status to approved if there is no appointment approved in same time
  res.send("/show_therapists");
});

module.exports = router;
