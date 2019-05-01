const { check, validationResult } = require("express-validator/check");
const database = require("../../db");
const User = require("./users.model");
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

const index = (req, res, next) => {
  User.query()
    .then(users => users)
    .catch(error => next(error));
};

const get = (req, res, next) => {
  return database
    .select("users.*", "identifying_info.name as identifying_info")
    .from("users")
    .leftJoin(
      "user_identifying_info",
      "user_identifying_info.user_id",
      "=",
      "users.id"
    )
    .leftJoin(
      "identifying_info",
      "user_identifying_info.identifying_info_id",
      "=",
      "identifying_info.id"
    )
    .where("users.id", req.params.id)
    .then(users => {
      if (users.length > 0) {
        return res.json({
          data: {
            ...users[0],
            identifying_info: users.map(u => u.identifying_info)
          }
        });
      }
      throw new NotFoundError("Unable to find user");
    })
    .catch(error => next(error));
};

const create = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const {
    first_name,
    last_name,
    email,
    employment_status,
    employer,
    pronouns
  } = req.body;
  return database("users")
    .insert({
      first_name,
      last_name,
      email,
      employment_status,
      employer,
      pronouns
    })
    .returning("*")
    .then(users => {
      const [json] = users;
      const { identifying_info } = req.body;
      json.identifying_info = identifying_info;
      if (identifying_info.length) {
        const names = identifying_info.map(i => i.name);
        return database("identifying_info")
          .select()
          .whereIn("name", identifying_info.map(i => i.name))
          .then(existing_info => {
            if (existing_info.length === identifying_info.length) {
              return existing_info.map(i => i.id);
            }
            const new_info = req.body.identifying_info
              .filter(info => !existing_info.find(i => i.name === info.name))
              .map(i => ({ name: i.name, is_gender: i.is_gender || false }));
            return database("identifying_info")
              .insert(new_info)
              .returning("id");
          })
          .then(info_ids => {
            return database("user_identifying_info").insert(
              info_ids.map(id => ({
                identifying_info_id: id,
                user_id: users[0].id
              }))
            );
          })
          .then(() => {
            return res.json(json);
          });
      }
      return res.json(json);
    })
    .catch(error => next(error));
};

const update = (req, res, next) => {};

module.exports = {
  index,
  get,
  update,
  create
};
