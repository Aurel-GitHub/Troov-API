const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const itemCtrl = require('../controllers/item.controller');

router.post('/', auth, itemCtrl.createItem);
router.put('/:id', auth, itemCtrl.updateItem);
router.get('/:id', auth, itemCtrl.getOneItemById);
router.get('/', auth, itemCtrl.getAllItems);
router.get('/:id', auth, itemCtrl.deleteItem);

module.exports = router;
