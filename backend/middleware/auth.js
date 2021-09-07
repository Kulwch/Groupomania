/**
 * Auth - middleware:
 * Used to ensure authentication on requests so that only registered users can access data
 * 
 * @jsonwebtoken is used to compare the bearer Token of the request with the userId. If match, user's request is allowed.
 * 
 */

const getUserIdFromToken = require("../utils/getUserId");

module.exports = (req, res, next) => {
  const userId = req.body.userId;
  const authorization = req.headers.authorization;

  console.log(req.body.userId)
  
  try {
    if (!authorization) throw new Error("Pas d'utilisateur enregistré");
    if (userId && userId !== getUserIdFromToken(req)) throw new Error("userId non valide");
    next();
  } catch (error) {
    res.status(401).json({message: 'Utilisateur non enregistré !'});
  }
};