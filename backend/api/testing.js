let express = require("express");
let router = express.Router();
let TimeUtils = require("../utils/TimeUtills");

router.get("/test1", function (req, res) {
  const { day, month, year, zone } = req.body;
  res.send(TimeUtils.getTime({ day, month, year }, zone).toString());
});

module.exports = router;
