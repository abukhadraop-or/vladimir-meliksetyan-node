const { Router } = require("express");
const {
  getUserMovies,
  addMovie,
  deleteMovie,
  getMovieWithID,
  updateMovie,
} = require("../controllers/moviesControllers");
const authenticate = require("../middleware/middleware");

const router = Router();

/**
 * endpoint to get all movies
 */

router.get("/", authenticate, getUserMovies);

/**
 * endpoint to get movie with id
 */
router.get("/:id", authenticate, getMovieWithID);

/**
 * endpoint to add new movie
 */

router.post("/addMovie", authenticate, addMovie);

/**
 * endpoint to delete movie
 */

router.delete("/:id", authenticate, deleteMovie);

/**
 * endpoint to update movie
 */

router.patch("/:id", authenticate, updateMovie);

module.exports = router;
