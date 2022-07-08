const User = require('../models/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * signup user
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
exports.signup = (req, res) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                email: req.body.email,
                password: hash,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
            });
            user.save()
                .then(() => res.status(201).json({ message: 'User created !' }))
                .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

/**
 * login user
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res
                    .status(401)
                    .json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res
                            .status(401)
                            .json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.SECRET_KEY,
                            { expiresIn: '24h' }
                        ),
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};

/**
 * login user
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
exports.logout = (req, res) => {
    try {
        req.session = null;
        req.headers.authorization = null;
        return res.status(200).send({ message: "You've been signed out!" });
    } catch (error) {
        return error;
    }
};
