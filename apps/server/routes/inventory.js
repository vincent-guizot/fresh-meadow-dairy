'use strict';

const express = require('express');
const router = express.Router();
const InventoryController = require('../controllers/Inventory');
const { authentication } = require('../middlewares/auth');

router.get('/', InventoryController.list);
router.get('/movements', InventoryController.movements);
router.post('/record', authentication, InventoryController.record);
// Unauthenticated fallback for dev ease
router.post('/', InventoryController.record);

module.exports = router;
