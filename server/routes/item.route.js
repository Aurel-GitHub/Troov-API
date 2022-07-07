const express = require('express');
const router = express.Router();
import { createItem, updateItem, getOneItemById, getAllItems, deleteItem } from '../controllers/item.controller'

router.post('/', createItem);
router.put('/:id', updateItem);
router.get('/:id', getOneItemById);
router.get('/', getAllItems);
router.get('/:id', deleteItem)


// router.get('/', (req, res) => {
//     Item.find()
//         .then((items) => res.status(200).json(items))
//         .catch((error) => res.status(401).json({ error }));
// });

// router.delete('/:id', (req, res) => {
//     Item.deleteOne({ _id: req.params.id })
//         .then(() => res.status(200).json({ message: 'Object deleted !' }))
//         .catch((error) => res.status(400).json({ error }));
// });

module.exports = router;
