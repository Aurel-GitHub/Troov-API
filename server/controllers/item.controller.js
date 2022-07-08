const Item = require('../models/Item');
const jwt = require('jsonwebtoken');

/**
 * create a new item
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
exports.createItem = (req, res) => {
    delete req.body._id;

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.userId;

    const item = new Item({
        ...req.body,
        userId: userId,
    });
    item.save(item)
        .then(() =>
            res.status(201).json({ message: 'Objet enregistré !', item })
        )
        .catch((error) => res.status(400).json({ error }));
};

/**
 * update an item
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
exports.updateItem = (req, res) => {
    Item.findById({ _id: req.params.id })
        .then((item) => {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            const userId = decodedToken.userId;
            const isAuthorized = item.userId == userId;

            // eslint-disable-next-line no-console
            console.log('item', item, userId, 'isAuthorized', isAuthorized);
            if (!isAuthorized) {
                res.status(401).json({ message: 'non autorisé' });
            } else {
                Item.updateOne(
                    { _id: req.params.id },
                    { ...req.body, _id: req.params.id }
                )
                    .then(() => {
                        res.status(200).json({ message: 'Objet modifié' });
                    })
                    .catch((error) => res.status(400).json({ error }));
            }
        })
        .catch((error) => res.status(401).json({ error }));
};

/**
 * get one item by id
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
exports.getOneItemById = (req, res) => {
    Item.findOne({ _id: req.params.id })
        .then((item) => res.status(200).json(item))
        .catch((error) => res.status(404).json({ error }));
};

/**
 * get all items
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
exports.getAllItems = (req, res) => {
    Item.find()
        .then((items) => res.status(200).json(items))
        .catch((error) => res.status(401).json({ error }));
};

/**
 * delete one item
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
exports.deleteItem = (req, res) => {
    Item.findById({ _id: req.params.id })
        .then((item) => {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            const userId = decodedToken.userId;
            const isAuthorized = item.userId == userId;

            // eslint-disable-next-line no-console
            console.log('item', item, userId, 'isAuthorized', isAuthorized);
            if (!isAuthorized) {
                res.status(401).json({ message: 'non autorisé' });
            } else {
                Item.deleteOne({ _id: req.params.id })
                    .then(() =>
                        res.status(200).json({ message: 'Objet supprimé' })
                    )
                    .catch((error) => res.status(400).json({ error }));
            }
        })
        .catch((error) => res.status(401).json({ error }));
};
