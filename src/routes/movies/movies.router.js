const express = require("express");
const { check } = require("express-validator");

const { listMovies, postMovie } = require("./movies.controller");
const moviesData = require("../../../db/movies.data.json");
const { validateBody } = require("../../middleware/validate-body");

const router = express.Router();

router.get("", listMovies);
router.post(
  "",
  [
    check("title")
      .not()
      .isEmpty(),
    check("year")
      .not()
      .isEmpty(),
    check("runtime")
      .not()
      .isEmpty(),
    check("genres").isIn(moviesData.genres),
    check("director")
      .not()
      .isEmpty(),
    check("actors")
      .not()
      .isEmpty(),
    check("plot")
      .not()
      .isEmpty(),
    check("posterUrl")
      .not()
      .isEmpty()
  ],
  validateBody,
  postMovie
);

module.exports = {
  moviesRouter: router
};
