const { Router } = require("express");
const movieRoutes = require("./movieRoutes");
const userRoutes = require("./userRoutes");

const router = Router();

router.use("/movie", movieRoutes);
router.use("/user", userRoutes);

router.use("*", (req, res) => {
  const message = new Error("page not found");
  res.send(message).status(401)
 
});
module.exports = router;
