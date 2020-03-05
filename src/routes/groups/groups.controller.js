const groupsData = require('../../db/data.json');

const groupsController = (req, res) => {
  return res.json({
    groups: groupsData
  });
};

module.exports = {
  groupsController
}