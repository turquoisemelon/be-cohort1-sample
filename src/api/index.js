const express = require("express");

const { healthRouter } = require("../routes/health/health.router");
const { moviesRouter } = require("../routes/movies/movies.router");

const router = express.Router();
router.use("/health", healthRouter);
router.use("/movies", moviesRouter);

module.exports = router;
