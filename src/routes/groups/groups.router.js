const express = require('express');

const { groupsController } = require("./groups.controller");

const router = express.Router();

router.get("", groupsController);

module.exports = {
  groupsRouter: router
}

