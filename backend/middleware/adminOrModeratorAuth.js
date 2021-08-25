/**
 * Auth - middleware:
 * Used to ensure authentication on api/sauce/ requests so that only registered users can access data
 * 
 * @jsonwebtoken is used to compare the bearer Token of the request with the userId. If match, user's request is allowed.
 * 
 */
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        const userId = decodedToken.userId;
        const userIsAdmin = decodedToken.userIsAdmin;
        const userIsModerator = decodedToken.userIsModerator;
        if (userIsAdmin !== 1 || userIsModerator !== 1) {
            throw 'non autorisé';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: "non autorisé"
        });
    }
};