/**
 * Fresh Meadow Dairy CMS - User & Auth Routes
 */

const { Router } = require('express');
const router = Router();
const { UserController } = require('../controllers');
const { authentication } = require('../middlewares/auth');

// Public Authentication Routes
router.post('/login', UserController.login);
router.post('/register', UserController.register);

// Protected Staff & Profile Routes
router.get('/', authentication, UserController.list);
router.get('/me', authentication, UserController.me);

module.exports = router;
