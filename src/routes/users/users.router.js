const express = require('express');

const { usersController } = require("./users.controller");

const router = express.Router();

router.get("", usersController);

module.exports = {
  usersRouter: router
}
