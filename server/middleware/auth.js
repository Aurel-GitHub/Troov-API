/* eslint-disable no-console */
const jwt = require('jsonwebtoken');

/**
 * Middleware to check the valid information contained in the token
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; //récupere le token (2nd element du tableau)
        console.log('toke', token);
        const decodedToken = jwt.verify(token, 'SECRET_TOKEN_DEV_ENV');
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable';
        } else {
            next();
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée' });
    }
};
