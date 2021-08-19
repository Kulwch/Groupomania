const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");

const getUserIsAdmin= (req) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
  const userIsAdmin = decodedToken.isAdmin;

  return userIsAdmin;
};

module.exports = getUserIsAdmin;