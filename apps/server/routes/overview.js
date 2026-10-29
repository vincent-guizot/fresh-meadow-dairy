'use strict';

const express = require('express');
const router = express.Router();
const OverviewController = require('../controllers/Overview');

router.get('/stats', OverviewController.getStats);
router.get('/', OverviewController.getStats);

module.exports = router;
