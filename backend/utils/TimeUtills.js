const { DateTime } = require("luxon");

const TestTime = () => {
  var local = DateTime.fromObject({ day: 22, hour: 3, zone: "Asia/Karachi" });
  var rezoned = DateTime.fromObject({ day: 22, hour: 3, zone: "Asia/Kuwait" });
  //var rezoned = local.setZone("Asia/Kuwait");

  // different local times with different offsets
  console.log(local.toString()); //=> '2017-09-13T18:30:51.141-04:00'
  console.log(rezoned.toString()); //=> '2017-09-13T15:30:51.141-07:00'
  console.log(local == rezoned);
};

const getTime = (date, zone) => {
  var local = DateTime.fromObject({ ...date, zone });
  return local;
};

module.exports.getTime = getTime;
module.exports.TestTime = TestTime;
