const { uuid } = require("uuidv4");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

/**
 * create new user and add it to database with uniqe ID
 * @param {HTTP request} req
 * @param {HTTP response} res
 */
const registerUser = async (req, res) => { 
  const { username, email, password } = req.body;
  const id = uuid();
  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  // check does user exist with given email or not
  const existeingUser = await User.findOne({ where: { email } });
  if (existeingUser) {
    res.status(409).send("User Already exists with this email");
  } else {
    try {
      const result = await User.create({
        id,
        username,
        email,
        password: hashedPassword,
      });
      res.status(201).send("user Created");
    } catch (error) {
      res.send(error.message).status(400);
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
  const user = await User.findOne({ where: { email } });
  // authorize user
  const foundUser = user?.dataValues;

  // check password validation
  if (foundUser) {
    const checkpassword = await bcrypt.compare(password, user.password);
    const token = jwt.sign(foundUser, process.env.JWT_ACCESS_SECRET);
    if (checkpassword) {
      res.status(200).send({ token });
    } else res.send("wrong password");
  } else res.status(404).send("user does not exist");
};

module.exports = {
  userLogin,
  registerUser,
};
