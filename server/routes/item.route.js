const express = require('express');
const router = express.Router();

const Item = require('../models/Item');

router.post('/', (req, res) => {
    delete req.body._id;
    const item = new Item({
        ...req.body,
    });
    item.save(item)
        .then(() => res.status(201).json({ message: 'Object recorded !' }))
        .catch((error) => res.status(400).json({ error }));
});
router.put('/:id', (req, res) => {
    Item.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Object updated !' }))
        .catch((error) => res.status(400).json({ error }));
});

router.get('/:id', (req, res) => {
    Item.findOne({ _id: req.params.id })
        .then((item) => res.status(200).json(item))
        .catch((error) => res.status(404).json({ error }));
});

router.get('/', (req, res) => {
    Item.find()
        .then((items) => res.status(200).json(items))
        .catch((error) => res.status(401).json({ error }));
});

router.delete('/:id', (req, res) => {
    Item.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Object deleted !' }))
        .catch((error) => res.status(400).json({ error }));
});

module.exports = router;
