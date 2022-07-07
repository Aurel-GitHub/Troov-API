const Item = require('../models/Item');

/**
 * create a new item
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
exports.createItem = (req, res) => {
    delete req.body._id;
    const item = new Item({
        ...req.body,
    });
    item.save(item)
        .then(() => res.status(201).json({ message: 'Object recorded !' }))
        .catch((error) => res.status(400).json({ error }));
};

/**
 * update an item
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
exports.updateItem = (req, res) => {
    Item.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Object updated !' }))
        .catch((error) => res.status(400).json({ error }));
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
    Item.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Object deleted !' }))
        .catch((error) => res.status(400).json({ error }));
};
