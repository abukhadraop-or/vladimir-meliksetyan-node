const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const createResponse = require("../utils/create-response");

/**
 * Create new user.
 *
 * @param {import('express').Request} req Express route request.
 * @param {import('express').Response} res Express route response.
 * @param {import('express').NextFunction} next Express route next function.
 */
const registerUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  // check does user exist with given email or not
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(409).json(
        createResponse({
          code: 409,
          message: "User Already exists with this email",
        })
      );
    } else {
      await User.create({
        username,
        email,
        password: hashedPassword,
      });
      res.status(201).json(createResponse({ message: "User created" }));
    }
  } catch (error) {
    next(error);
  }
};

/**
 *
 * @param {import('express').Request} req Express route request.
 * @param {import('express').Response} res Express route response.
 * @param {import('express').NextFunction} next Express route next function.
 */
const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  // find user with email
  try {
    const user = await User.findOne({ where: { email } });
    // authorize user
    const foundUser = user?.dataValues;
    // check password validation
    if (foundUser) {
      const checkPassword = await bcrypt.compare(password, user.password);
      const token = jwt.sign(foundUser, process.env.JWT_ACCESS_SECRET);
      if (checkPassword) {
        res.json(createResponse({ code: 200, message: token }));
      } else {
        res.json(createResponse({ message: "Wrong password" }));
      }
    } else {
      res
        .status(404)
        .json(createResponse({ code: 404, message: "User does not exist" }));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userLogin,
  registerUser,
};
