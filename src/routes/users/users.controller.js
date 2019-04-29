const configuration = require('../../../knexfile')
const database = require('knex')(configuration);

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

const index = (req, res, next) => {
  database('users').select().then((users) => {
    return res.json({
      data: users
    });
  }).catch((error) => next(error));
};

const get = (req, res, next) => {
  database('users').where('id', req.params.id).then((users) => {
    if (users.length > 0) {
      return res.json(user[0]);
    }
    throw new NotFoundError('Unable to find user');
  }).catch((error) => next(error));
}

module.exports = {
  index,
  get
}
