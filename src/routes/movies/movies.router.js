const express = require("express");

const { listMovies, postMovie } = require("./movies.controller");

const router = express.Router();

router.get("", listMovies);
router.post("", postMovie);

module.exports = {
  moviesRouter: router
};
