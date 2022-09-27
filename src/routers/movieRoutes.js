const { Router } = require("express");
const {
  getAllMovies,
  addMovie,
  getFilteredMovies,
  deleteFilm,
} = require("../controllers/moviesControllers");
const authenticate = require("../middleware");

const router = Router();

/**
 * endpoint to get all movies
 */
router.get("/movies", authenticate, getAllMovies);

/**
 * endpoint to get filtered movies
 */

router.post("/filter", authenticate, getFilteredMovies);

/**
 * endpoint to add new movie
 */

router.post("/newMovie", authenticate, addMovie);

/**
 * endpoint to delete movie
 */
router.delete("/deleteMovie", deleteFilm);

module.exports = router;
