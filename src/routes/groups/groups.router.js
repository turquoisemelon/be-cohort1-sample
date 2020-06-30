const express = require('express');

const { listGroups, postGroup, deleteGroup, updateGroup } = require("./groups.controller");

const router = express.Router();

router.get("", listGroups);

router.post("", postGroup);

router.put("", updateGroup);

router.delete("", deleteGroup);

module.exports = {
  groupsRouter: router
}

