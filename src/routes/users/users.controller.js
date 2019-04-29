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
  database.select('users.*', 'identifying_info.name as identifying_info')
    .from('users')
    .leftJoin('user_identifying_info', 'user_identifying_info.user_id', '=', 'users.id')
    .leftJoin('identifying_info', 'user_identifying_info.identifying_info_id', '=', 'identifying_info.id')
    .where('users.id', req.params.id)
    .then((users) => {
      if (users.length > 0) {
        return res.json({ data: {
          ...users[0],
          identifying_info: users.map((u) => u.identifying_info)
        }});
      }
      throw new NotFoundError('Unable to find user');
  }).catch((error) => next(error));
}

const create = (req, res, next) => {
  database('users').insert(req.body.user, ['*']).then((user) => {
    res.json(user)
  }).catch((error) => next(error))
}

const update = (req, res, next) => {
  database('users')
    .where('id', req.params.id)
    .update(req.body.user, ['*']).then((user) => {
      res.json(user)
    })
  .catch((error) => next(error));
}

module.exports = {
  index,
  get,
  update,
  create
}
