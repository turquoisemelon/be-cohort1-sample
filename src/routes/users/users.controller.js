const configuration = require('../../../knexfile')
const database = require('knex')(configuration);

const usersController = (req, res) => {
  database('users').select().then((users) => {
    return res.json(users);
  })
};

module.exports = {
  usersController
}
