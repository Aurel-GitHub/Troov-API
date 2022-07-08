const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const itemCtrl = require('../controllers/item.controller');

router.post('/', auth, itemCtrl.createItem);
router.put('/:id', auth, itemCtrl.updateItem);
router.get('/:id', itemCtrl.getOneItemById);
router.delete('/:id', auth, itemCtrl.deleteItem);
router.get('/', itemCtrl.getAllItems);

module.exports = router;
