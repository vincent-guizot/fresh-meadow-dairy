/**
 * Fresh Meadow Dairy CMS - Central API Router
 */

const { Router } = require('express');
const router = Router();
const userRoutes = require('./user');
const productRoutes = require('./product');

// Root health check endpoint
router.get('/', (req, res) => {
    return res.status(200).json({
        message: 'This is home page thanks.',
        service: 'Fresh Meadow Dairy CMS API',
        status: 'online',
        timestamp: new Date().toISOString()
    });
});

// API Sub-routers
router.use('/users', userRoutes);
router.use('/products', productRoutes);

module.exports = router;
