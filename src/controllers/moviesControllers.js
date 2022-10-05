const { uuid } = require("uuidv4");
const { movies } = require("../models");

/**
 *  get all users movies
 * @param {HTTP request} req
 * @param {HTTP response} res
 */
const getAllMovies = async (req, res) => {
  const { id } = req.user;
  try {
    // take movies from database with user id
    const Movies = await movies.findAll({ where: { user_id: id } });
    if (Movies) {
      res.send(Movies).status(200);
    } else res.send([], "no Movies Here");
  } catch (error) {
    console.log(error);
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
    await movies.create({
      id: uuid(),
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
    console.log(error);
    res.json({ message: error.message }).status("401");
  }
};

/**
 *  get user's filtered movies
 *  @param {HTTP request} req
 *  @param {HTTP response} res
 */
const getFilteredMovies = async (req, res) => {
  const { id: user_id } = req.user;
  const { filter } = req.body;
  try {
    const filteredMovies = await movies.findAll({
      where: { user_id },
      order: [[filter.type, filter.value]],
    });
    if (filteredMovies) {
      res.send(filteredMovies).status(201);
    }
  } catch (error) {
    console.log(error);
    res.json({ message: error.message }).status("401");
  }
};
/**
 *  delete movie from user's account
 *  @param {HTTP request} req
 *  @param {HTTP response} res
 */
const deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    movies.destroy({
      where: { id },
    });
    res.send(200);
  } catch (error) {
    console.log(error);
    res.json({ message: error.message }).status("401");
  }
};

/**
 *  update movie 
 *  @param {HTTP request} req
 *  @param {HTTP response} res
 */
const updateMovie = async (req, res) => {
  const { id } = req.params;
  try {
    await movies.update(req.body, { where: { id } });
    res.status(201).send("Movie updated");
  } catch (error) {
    console.log(error);
    res.json({ message: error.message }).status(401);
  }
};

module.exports = {
  getAllMovies,
  addMovie,
  getFilteredMovies,
  deleteMovie,
  updateMovie,
};
