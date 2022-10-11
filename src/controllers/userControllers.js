const { uuid } = require("uuidv4");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const createResponse = require("../utils/create-response");

/**
 * create new user and add it to database with uniqe ID
 * @param {HTTP request} req
 * @param {HTTP response} res
 */
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  // check does user exist with given email or not

  try {
    const existeingUser = await User.findOne({ where: { email } });
    if (existeingUser) {
      res.json(createResponse(409, "User Already exists with this email"));
    } else {
      await User.create({
        username,
        email,
        password: hashedPassword,
      });
      res.json(createResponse(200));
    }
  } catch (error) {
    if (error) {
      console.log(error);
      res.send(error.message)
    }
  }
};

/**
 *
 * @param {HTTP request} req
 * @param {HTTP response} res
 */
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  // find user with email
  try {
    const user = await User.findOne({ where: { email } });
    // authorize user
    const foundUser = user?.dataValues;
    // check password validation
    if (foundUser) {
      const checkpassword = await bcrypt.compare(password, user.password);
      const token = jwt.sign(foundUser, process.env.JWT_ACCESS_SECRET);
      if (checkpassword) {
        res.json(createResponse(201, "ok")).send(token);
      } else {
        res.send("wrong password");
      }
    } else {
      res.status(404).send("user does not exist");
    }
  } catch (error) {
   if (error) {
     res.send(error.message)
   }
  }
};

module.exports = {
  userLogin,
  registerUser,
};
