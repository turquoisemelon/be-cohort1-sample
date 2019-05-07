const express = require("express");
const { check } = require("express-validator/check");
const configuration = require("../../../knexfile");
const database = require("knex")(configuration);

const {
  list,
  create,
  get,
  update,
  remove
} = require("./applications.controllers");

const router = express.Router();

router.get("", list);
router.post(
  "",
  [
    check("cohort_id").exists(),
    check("cohort_id").custom(value => {
      return database("cohorts")
        .select("id")
        .where({ id: value })
        .then(result => {
          if (result.length) {
            return Promise.reject("This cohort does not exist");
          }
        });
    }),
    check("user_id").exists(),
    check("user_id").custom(value => {
      return database("users")
        .select("id")
        .where({ id: value })
        .then(result => {
          if (result.length) {
            return Promise.reject("This user does not exist");
          }
        });
    })
  ],
  create
);
router.get("/:id", get);
router.put(
  "/:id",
  [
    check("cohort_id").custom(value => {
      return database("cohorts")
        .select("id")
        .where({ id: value })
        .then(result => {
          if (result.length === 0) {
            return Promise.reject("This cohort does not exist");
          }
        });
    }),
    check("user_id").custom(value => {
      return database("users")
        .select("id")
        .where({ id: value })
        .then(result => {
          if (result.length === 0) {
            return Promise.reject("This user does not exist");
          }
        });
    })
  ],
  update
);
router.delete("/:id", remove);

exports.applicationsRouter = router;
