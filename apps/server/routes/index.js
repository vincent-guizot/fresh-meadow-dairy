/**
 * Fresh Meadow Dairy CMS - Central API Router
 */

const { Router } = require('express');
const router = Router();
const userRoutes = require('./user');
const productRoutes = require('./product');
const categoryRoutes = require('./category');
const orderRoutes = require('./order');
const inventoryRoutes = require('./inventory');
const overviewRoutes = require('./overview');

// Root health check endpoint
router.get('/', (req, res) => {
    return res.status(200).json({
        message: 'Fresh Meadow Dairy API Engine',
        service: 'Fresh Meadow Dairy CMS & Storefront API',
        status: 'online',
        timestamp: new Date().toISOString()
    });
});

// API Sub-routers
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/orders', orderRoutes);
router.use('/inventory', inventoryRoutes);
router.use('/overview', overviewRoutes);

// Convenience aliases for Customers and Staff (filtered from Users table)
router.use('/customers', (req, res, next) => {
    req.query.role = 'customer';
    return userRoutes(req, res, next);
});

router.use('/staff', (req, res, next) => {
    req.query.role = 'staff,admin';
    return userRoutes(req, res, next);
});

module.exports = router;
