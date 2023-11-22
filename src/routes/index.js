const router = require("express").Router();

require("./executor.route")(router);

module.exports = {
  router,
};
