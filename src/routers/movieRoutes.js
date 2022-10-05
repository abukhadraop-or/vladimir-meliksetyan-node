const { Router } = require("express");
const {
  getAllMovies,
  addMovie,
  getFilteredMovies,
  deleteMovie,
  updateMovie,
} = require("../controllers/moviesControllers");
const authenticate = require("../middleware/middleware");

const router = Router();

/**
 * endpoint to get all movies
 */

router.get("/", authenticate, getAllMovies);

/**
 * endpoint to get filtered movies
 */

router.post("/filter", authenticate, getFilteredMovies);

/**
 * endpoint to add new movie
 */

router.post("/addMovie", authenticate, addMovie);

/**
 * endpoint to delete movie
 */

router.delete("/:id", deleteMovie);

/**
 * endpoint to update movie
 */

router.put("/:id", updateMovie);

module.exports = router;
