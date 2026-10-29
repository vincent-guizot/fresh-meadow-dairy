'use strict';

const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/Category');
const { authentication } = require('../middlewares/auth');

// Public endpoints
router.get('/', CategoryController.list);
router.get('/:id', CategoryController.getById);

// Admin / staff management endpoints
router.post('/', authentication, CategoryController.create);
router.put('/:id', authentication, CategoryController.update);
router.delete('/:id', authentication, CategoryController.delete);

module.exports = router;
