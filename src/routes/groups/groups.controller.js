const fs = require("fs");
const { promisify } = require("util");

const groupsData = require('../../db/data.json');

const writeFile = promisify(fs.writeFile);

const listGroups = (req, res) => {
  return res.json({
    data: groupsData
  });
};

const postGroup = async (req, res) => {
  const id = groupsData.groups.length + 1;
  const newGroupsData = {
    groups: [...groupsData.groups, { id, ...req.body }]
  };

  await writeFile("src/db/data.json", JSON.stringify(newGroupsData));
  res.status(201);
  return res.json({
    id,
    ...req.body
  })
}

module.exports = {
  listGroups,
  postGroup
}