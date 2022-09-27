const { Router } = require("express");
const { userLogin, registerUser } = require("../controllers/userControllers");

const router = Router();

/**
 * endpoint to create new user
 */
router.post("/register", registerUser);

/**
 * endpoint to login user
 */
router.post("/login", userLogin);

module.exports = router;
