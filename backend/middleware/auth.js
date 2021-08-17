/**
 * Auth - middleware:
 * Used to ensure authentication on api/sauce/ requests so that only registered users can access data
 * 
 * @jsonwebtoken is used to compare the bearer Token of the request with the userId. If match, user's request is allowed.
 * 
 */

const jwt = require('jsonwebtoken');
const User = require('../models/user');
const sequelize = require('../models/index.js');
const dotenv = require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    const user = sequelize.User.findOne({id: decodedToken.id })
        if (! user) {
            throw new Error
        }
        req.user = user
        next()
  } catch (error) {
    res.status(401).json({message: 'Requête non valide !'});
  }
};
