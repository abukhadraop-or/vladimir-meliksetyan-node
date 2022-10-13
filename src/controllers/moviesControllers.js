const { Movie } = require("../models");
const createResponse = require("../utils/create-response");

/**
 * Get all movies.
 *
 * @param {import('express').Request} req Express route request.
 * @param {import('express').Response} res Express route response.
 * @param {import('express').NextFunction} next Express route next function.
 */
const getAllMovies = async (req, res, next) => {
  const { filter } = req.body;

  try {
    const movies = await Movie.findAll({
      order: filter ? [[filter.type, filter.value]] : [],
    });
    if (movies) {
      res.json(createResponse({ data: movies })).status(200);
    } else res.json(createResponse(401, "no movies to show"));
  } catch (error) {
    next(error);
  }
};

/**
 * Get movie by id.
 *
 * @param {import('express').Request} req Express route request.
 * @param {import('express').Response} res Express route response.
 * @param {import('express').NextFunction} next Express route next function.
 */
const getMovie = async (req, res, next) => {
  const { id } = req.params;
  const movieExists = await Movie.findOne({ where: { id } });
  try {
    if (movieExists) {
      const movie = movieExists.dataValues;
      res.json(createResponse({ data: movie })).status(200);
    } else {
      res.json(createResponse(401, "Movie does not exist"));
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Create new movie.
 *
 * @param {import('express').Request} req Express route request.
 * @param {import('express').Response} res Express route response.
 * @param {import('express').NextFunction} next Express route next function.
 */
const addMovie = async (req, res, next) => {
  // take movie information from request
  const {
    originalLanguage,
    originalTitle,
    overview,
    popularity,
    posterPath,
    backdropPath,
    releaseDate,
    title,
    voteAverage,
  } = req.body;

  // create movie in DB
  try {
    const data = await Movie.create({
      originalLanguage,
      backdropPath,
      originalTitle,
      overview,
      popularity,
      posterPath,
      releaseDate,
      title,
      voteAverage,
    });
    res.status(201).json(createResponse({ code: 201, data }));
  } catch (error) {
    next(error);
  }
};

/**
 * Update an existing movie.
 *
 * @param {import('express').Request} req Express route request.
 * @param {import('express').Response} res Express route response.
 * @param {import('express').NextFunction} next Express route next function.
 */
const updateMovie = async (req, res, next) => {
  const { id } = req.params;
  try {
    const movieExists = await Movie.findAll({ where: { id } });
    if (movieExists.length) {
      const [, data] = await Movie.update(req.body, {
        where: { id },
        returning: true,
      });
      res.json(createResponse({ data }));
    } else {
      res
        .status(404)
        .json(createResponse({ code: 404, message: "Movie does not exist" }));
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Delete movie.
 *
 * @param {import('express').Request} req Express route request.
 * @param {import('express').Response} res Express route response.
 * @param {import('express').NextFunction} next Express route next function.
 */
const deleteMovie = async (req, res, next) => {
  const { id } = req.params;

  try {
    const movieExists = await Movie.findAll({ where: { id } });
    if (movieExists.length) {
      Movie.destroy({
        where: { id },
      });
      res.json(createResponse({ message: "Movie deleted" }));
    } else {
      res
        .status(404)
        .json(createResponse({ code: 404, message: "Movie does not exist" }));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMovies,
  addMovie,
  deleteMovie,
  updateMovie,
  getMovie,
};
