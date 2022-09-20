const { uuid } = require("uuidv4");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { movies } = require("../models");

// register user in DB
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
      const user = await User.create({
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

// login user in his account
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  // find user with email
  const foundUser = await User.findOne({ where: { email } });
  // take found user data
  const user = foundUser.dataValues;
  // authorize user
  const token = jwt.sign(user, process.env.JWT_ACCESS_SECRET);
  // check password validation
  if (user) {
    const checkpassword = await bcrypt.compare(password, user.password);
    if (checkpassword) {
      res.status(200).send({ token });
    } else res.send("wrong password");
  } else res.status(404).send("user does not exist");
};

// get all user movies
const getAllMovies = async (req, res) => {
  const { id } = req.user;
  const Movies = await movies.findAll({ where: { user_id: id } });
  if (Movies) {
    res.send(Movies).status(200);
  } else res.send([]).json({ message: "no movies here " });
};

// add new movie 
const addMovie = async (req, res) => {
  const { id: user_id } = req.user;
  // take movie information from request
  const {
    original_language,
    original_title,
    overview,
    popularity,
    poster_path,
    backdrop_path,
    release_date,
    title,
    vote_average,
  } = req.body;
  // create movie in DB
  await movies.create({
    id: uuid(),
    original_language,
    backdrop_path,
    original_title,
    overview,
    popularity,
    poster_path,
    release_date,
    title,
    vote_average, 
    user_id,
  });
};

// get filtered movie from DB
const getFilteredMovies = async (req, res) => {
  const { id: user_id } = req.user;
  const { filter } = req.body;
  const filteredMovies = await movies.findAll({
    where: { user_id },
    order: [[filter.type, filter.value]],
  });
  if (filteredMovies) {
    res.send(filteredMovies).status(201);  
  }
};
// delete Movie form DB
const deleteFilm = async (req, res) => {
  const { id } = req.body;
  movies.destroy({
    where: { id },
  });
  res.send(200);
};

module.exports = {
  registerUser,
  userLogin,
  getAllMovies,
  addMovie,
  deleteFilm,
  getFilteredMovies,
};
