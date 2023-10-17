const { execute } = require("../executor/executor");

module.exports = function (app) {
  app.get("/execute", execute);
};
