const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

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
    User.findOne({
        email: req.body.email,
    })
        .then((user) => {
            if (user === null) {
                res.status(401).json({ message: 'email password incorrect' });
            } else {
                bcrypt
                    .compare(req.body.password, user.password)
                    .then((valid) => {
                        if (!valid) {
                            res.status(401).json({
                                message: 'email password incorrect',
                            });
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user.id },
                                    process.env.SECRET_KEY,
                                    { expiresIn: '24h' }
                                ),
                            });
                        }
                    })
                    .catch((error) => res.status(500).json({ error }));
            }
        })
        .catch((error) => res.status(500).json({ error }));
};
