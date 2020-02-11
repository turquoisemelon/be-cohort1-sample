const fs = require("fs");
const { promisify } = require("util");
const { validationResult } = require("express-validator");

const moviesData = require("../../../db/movies.data.json");

const writeFile = promisify(fs.writeFile);

const listMovies = (req, res) => {
  return res.json({
    data: moviesData
  });
};

const postMovie = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const id = moviesData.movies.length + 1;
  const newMoviesData = {
    genres: moviesData.genres,
    movies: [...moviesData.movies, { id, ...req.body }]
  };
  await writeFile("db/movies.data.json", JSON.stringify(newMoviesData));
  res.status(201);
  return res.json({
    id,
    ...req.body
  });
};

module.exports = {
  listMovies,
  postMovie
};
