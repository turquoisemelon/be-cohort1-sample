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

const updateGroup = async (req, res) => {
  const groupId = groupsData.groups.length;

  let groupToUpdate = groupsData.filter(group => group.id === groupId)

  const updatedGroupsData = {
    groups: [...groupsData.groups, { id, ...req.body }]
  };
}

const deleteGroup = async (req, res) => {
  const id = groupsData.groups.length;

  const newGroupsData = {
    groups: groupsData.groups.filter(group => group.id !== id)
  }

  await writeFile("src/db/data.json", JSON.stringify(newGroupsData));
  res.status(200);

  return res.json({
    data: newGroupsData
  })
}

module.exports = {
  listGroups,
  postGroup,
  updateGroup,
  deleteGroup
}