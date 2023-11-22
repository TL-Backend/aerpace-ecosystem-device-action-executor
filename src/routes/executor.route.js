const { execute } = require("../executor/executor");
const { executorInputValidator } = require("../executor/executor.middleware");

module.exports = function (app) {
  app.post("/devices/execute", executorInputValidator, execute);
};
