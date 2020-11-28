module.exports = function (app) {
  app.use("/", require("../api/testing"));
  app.use("/", require("../api/appointments"));
  app.use("/", require("../api/auth"));
  app.use("/", require("../api/chat"));
  app.use("/", require("../api/patient"));
  app.use("/", require("../api/posts"));
  app.use("/", require("../api/therapist"));
  app.use("/", require("../api/userProfile"));
};
