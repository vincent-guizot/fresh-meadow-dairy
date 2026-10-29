/**
 * Fresh Meadow Dairy CMS - User, Staff & Customer Routes
 */

const { Router } = require('express');
const router = Router();
const { UserController } = require('../controllers');
const { authentication } = require('../middlewares/auth');

// Public Authentication Routes
router.post('/login', UserController.login);
router.post('/register', UserController.register);

// Profile
router.get('/me', authentication, UserController.me);

// User CRUD (supports query ?role=customer or ?role=staff)
router.get('/', authentication, UserController.list);
router.get('/:id', authentication, UserController.getById);
router.post('/', UserController.register);
router.put('/:id', authentication, UserController.update);
router.delete('/:id', authentication, UserController.delete);

module.exports = router;
