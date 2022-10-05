const jwt = require("jsonwebtoken");

/**
 * 
 * @param {HTTP request} req 
 * @param {HTTP response} res 
 * @param {Function} next 
 * @returns {response.status}
 */
const authenticate = (req, res, next) => {
  // take token from header
  const authHeader = req.headers["authorization"];
  // split and take only token part
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).send();
  // create token if it not exists
  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
    if (err) return res.status(403).send();
    req.user = user;
    next();
  });
};

module.exports = authenticate;
