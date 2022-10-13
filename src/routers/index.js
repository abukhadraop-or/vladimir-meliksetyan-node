const { Router } = require("express");
const movieRoutes = require("./movieRoutes");
const userRoutes = require("./userRoutes");

const router = Router();

router.use("/movies", movieRoutes);
router.use("/user", userRoutes);

router.use("*", (req, res) => {
  res.status(404).send("Page not found");
});
module.exports = router;
