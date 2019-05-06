const { check, checkBody, validationResult } = require("express-validator/check");
const database = require("../../db");
const Cohort = require("./cohorts.model");
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

const index = (req, res, next) => {
  Cohort.query()
    .then(cohorts => res.json({ data: cohorts }))
    .catch(error => next(error));
};

const create = (req, res, next) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("ERROR")
      return res.status(422).json({ errors: errors.array() });
    }
    return Cohort.insertCohort(req.body)
      .then(cohort => res.json(cohort))
      .catch(error => next(error))
}

const get = (req, res, next) => {
  return Cohort.query()
    .where("cohorts.id", req.params.id)
    .then(cohorts => {
      if(cohorts.length > 0) {
        return res.json({
          data: cohorts[0]
        })
      }
      throw new NotFoundError("Unable to find cohort");
    })
    .catch(error => next(error))
}

const update = (req, res, next) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("ERROR")
      return res.status(422).json({ errors: errors.array() });
    }
  console.log(req.params.id)
  const id = req.params.id
  return Cohort.updateCohort(id, req.body)
    .then(cohort => res.json(cohort))
    .catch(error => next(error))
}

// const get = (req, res, next) => {
//   return User.query()
//     .where("users.id", req.params.id)
//     .eager("identifying_info")
//     .then(users => {
//       if (users.length > 0) {
//         return res.json({
//           data: users[0]
//         });
//       }
//       throw new NotFoundError("Unable to find user");
//     })
//     .catch(error => next(error));
// };
//
// const create = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(422).json({ errors: errors.array() });
//   }
//   return User.insertUser(req.body)
//     .then(user => {
//       const { identifying_info } = req.body;
//       user.identifying_info = identifying_info;
//       if (identifying_info.length) {
//         const names = identifying_info.map(i => i.name);
//         return IdentifyingInfo.getInfoWithNames(names)
//           .then(existing_info => {
//             if (existing_info.length === identifying_info.length) {
//               return existing_info.map(i => i.id);
//             }
//             const new_info = req.body.identifying_info
//               .filter(info => !existing_info.find(i => i.name === info.name))
//               .map(i => ({ name: i.name, is_gender: i.is_gender || false }));
//             return database("identifying_info")
//               .insert(new_info)
//               .returning("id");
//           })
//           .then(info_ids => {
//             return database("user_identifying_info").insert(
//               info_ids.map(id => ({
//                 identifying_info_id: id,
//                 user_id: user.id
//               }))
//             );
//           })
//           .then(() => {
//             return res.json(user);
//           });
//       }
//       return res.json(user);
//     })
//     .catch(error => next(error));
// };
//
// const update = (req, res, next) => {};

module.exports = {
  index,
  get,
  update,
  create
};
