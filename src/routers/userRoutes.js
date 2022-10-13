const { Router } = require("express");
const { userLogin, registerUser } = require("../controllers/userControllers");

const router = Router();

/**
 * Handle POST to /user/signup route.
 */
router.post("/signup", registerUser);

/**
 * Handle POST to /user/login route.
 */
router.post("/login", userLogin);

module.exports = router;
