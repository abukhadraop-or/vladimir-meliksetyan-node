const { Router } = require("express");
const movieRoutes = require("./movieRoutes");
const userRoutes = require("./userRoutes");

const router = Router();

router.use("/movie", movieRoutes);
router.use("/user", userRoutes);

module.exports = router;
