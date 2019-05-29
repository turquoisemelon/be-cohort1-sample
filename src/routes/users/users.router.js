const express = require("express");
const { check } = require("express-validator/check");
const configuration = require("../../../knexfile");
const database = require("knex")(configuration);
const usersController = require("./users.controller");

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

const router = express.Router();

router.get(
  "",
  (req, res, next) => {
    console.log(req.user.permissions);
    if (req.user.permissions.includes("read:users")) {
      next();
    } else {
      next(new UnauthorizedError("NO! YOU CANT! WHO DO YOU THINK YOU ARE"));
    }
  },
  usersController.index
);

router.post(
  "",
  [
    check("email").isEmail(),
    check("email").custom(value => {
      return database("users")
        .select("id")
        .where({ email: value })
        .then(result => {
          if (result.length) {
            return Promise.reject("Email in use");
          }
        });
    }),
    check("first_name").isLength({ min: 2 }),
    check("last_name").isLength({ min: 2 }),
    check("pronouns").exists(),
    check("employment_status").isIn([
      "full_time",
      "part_time",
      "in_school",
      "looking",
      "not_looking"
    ]),
    check("identifying_info").isArray()
  ],
  usersController.create
);

router.get("/:id", usersController.get);

router.put("/:id", usersController.update);

module.exports = {
  usersRouter: router
};
