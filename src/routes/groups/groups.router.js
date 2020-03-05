const express = require('express');

const { listGroups, postGroup } = require("./groups.controller");

const router = express.Router();

router.get("", listGroups);

router.post("", postGroup);

module.exports = {
  groupsRouter: router
}

