const { Movie } = require("../models");
const movie = require("../models/movie");
const createResponse = require("../utils/create-response");

/**
 *  get all users movies
 * @param {HTTP request} req
 * @param {HTTP response} res
 */
const getUserMovies = async (req, res) => {
  const { id } = req.user;
  const { filter } = req.body;
  try {
    // take movies from database with user id
    const movies = await Movie.findAll({
      where: { user_id: id },
      order: filter ? [[filter.type, filter.value]] : [],
    });
    if (movies) {
      res.send(movies).status(200);
    } else res.json(createResponse(401, "now movies to show"));
  } catch (error) {
    if (error) {
      res.send(error.message);
    }
  }
};

/**
 *  add movie to user's account
 *  @param {HTTP request} req
 *  @param {HTTP response} res
 */

const addMovie = async (req, res) => {
  const { id: user_id } = req.user;

  // take movie information from request
  const {
    original_language,
    original_title,
    overview,
    popularity,
    poster_path,
    backdrop_path,
    release_date,
    title,
    vote_average,
  } = req.body;
  // create movie in DB
  try {
    await Movie.create({
      original_language,
      backdrop_path,
      original_title,
      overview,
      popularity,
      poster_path,
      release_date,
      title,
      vote_average,
      user_id,
    });
    res.status(201);
  } catch (error) {
    if (error) {
      res.send(error.message);
    }
  }
};

/**
 *  delete movie from user's account
 *  @param {HTTP request} req
 *  @param {HTTP response} res
 */
const deleteMovie = async (req, res) => {
  const { id } = req.params;
  const movieExists = await Movie.findAll({ where: { id } });
  if (movieExists) {
    try {
      Movie.destroy({
        where: { id },
      });
      res.json(createResponse(201, "movie deleted"));
    } catch (error) {
      if (error) {
        res.send(error.message);
      }
    }
  } else {
    res.send("movie does not exist").status(401);
  }
};

/**
 *  update movie
 *  @param {HTTP request} req
 *  @param {HTTP response} res
 */
const updateMovie = async (req, res) => {
  const { id } = req.params;
  const movieExists = await Movie.findAll({ where: { id } });
  if (movieExists) {
    try {
      await Movie.update(req.body, { where: { id } });
      res.json(createResponse(201, "movie updated"));
    } catch (error) {
      if (error) {
        res.send(error.message);
      }
    }
  } else {
    res.send("Movie does not exist").status(401);
  }
};

/**
 *  update movie
 *  @param {HTTP request} req
 *  @param {HTTP response} res
 */
const getMovieWithID = async (req, res) => {
  const { id } = req.params;
  const movieExists = await Movie.findOne({ where: { id } });
  try {
    if (movieExists) {
      const movie = movieExists.dataValues;
      res.send(movie).status(200);
    } else {
      res.json(createResponse(401, "movie does not exist"));
    }
  } catch (error) {
    if (error) {
      res.send(error.message);
    }
  }
};
module.exports = {
  getUserMovies,
  addMovie,
  deleteMovie,
  updateMovie,
  getMovieWithID,
};
