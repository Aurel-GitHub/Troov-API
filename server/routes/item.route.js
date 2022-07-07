const express = require('express');
const router = express.Router();
const itemCtrl = require('../controllers/item.controller');

router.post('/', itemCtrl.createItem);
router.put('/:id', itemCtrl.updateItem);
router.get('/:id', itemCtrl.getOneItemById);
router.get('/', itemCtrl.getAllItems);
router.get('/:id', itemCtrl.deleteItem);

module.exports = router;
