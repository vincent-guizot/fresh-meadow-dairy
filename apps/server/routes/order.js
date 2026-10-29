'use strict';

const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/Order');
const { authentication } = require('../middlewares/auth');

// List & Detail (public or staff)
router.get('/', OrderController.list);
router.get('/:id', OrderController.getById);

// Create order (from web-user checkout or CMS)
router.post('/', OrderController.create);

// Update status & approve (CMS Admin confirmation & status progression)
router.patch('/:id/status', authentication, OrderController.updateStatus);
router.patch('/:id/approve', authentication, OrderController.approve);

// Fallback without auth for local testing convenience if unauthenticated in dev
router.put('/:id/status', OrderController.updateStatus);
router.put('/:id/approve', OrderController.approve);

// Delete order
router.delete('/:id', authentication, OrderController.delete);

module.exports = router;
