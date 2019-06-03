const express = require("express");
const {
  check,
} = require("express-validator/check");

const cohortsController = require("./cohorts.controller");

const router = express.Router();

router.get("", cohortsController.index);

const isDate = value => {
  const d = Date.parse(value);
  return !isNaN(d);
};

router.post(
  "",
  [
    check("name").exists(),
    //check("cohort_type").isIn(["frontend, backend, design"]),
    check("start_date").custom(value => isDate(value)),
    check("end_date").custom(value => isDate(value)),
    check("welcome_text").isLength({ min: 2 }),
    check("thank_you_text").isLength({ min: 2 })
  ],
  cohortsController.create
);

router.get("/:id", cohortsController.get);

router.get("/:id/applications", cohortsController.getCohortApplications);

router.put("/:id", cohortsController.update);

router.delete("/:id", cohortsController.remove);

module.exports = {
  cohortsRouter: router
};
