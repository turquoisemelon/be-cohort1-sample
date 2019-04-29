const express = require('express');

const usersController = require("./users.controller");

const router = express.Router();

router.get("", usersController.index);

router.post("", usersController.create);

router.get("/:id", usersController.get);

router.put("/:id", usersController.update);

module.exports = {
  usersRouter: router
}
