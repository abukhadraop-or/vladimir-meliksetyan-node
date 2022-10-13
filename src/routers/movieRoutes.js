const { Router } = require("express");
const {
  getAllMovies,
  addMovie,
  deleteMovie,
  getMovie,
  updateMovie,
} = require("../controllers/moviesControllers");
const authenticate = require("../middleware/middleware");
const router = Router();

/**
 * Handle GET to /movies route.
 */
router.get("/", getAllMovies);

/**
 * Handle GET to /movies/:id route.
 */
router.get("/:id", authenticate, getMovie);

/**
 * Handle POST to /movies route.
 */
router.post("/", authenticate, addMovie);

/**
 * Handle PATCH to /movies/:id route.
 */
router.patch("/:id", authenticate, updateMovie);

/**
 * Handle DELETE to /movies/:id route.
 */
router.delete("/:id", authenticate, deleteMovie);

module.exports = router;
