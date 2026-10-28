/**
 * Fresh Meadow Dairy CMS - Dairy Product Routes
 */

const { Router } = require('express');
const router = Router();
const { ProductController } = require('../controllers');
const { authentication, authorization } = require('../middlewares/auth');
const upload = require('../middlewares/multer');

// Public Product Catalog Endpoints
router.get('/', ProductController.getProduct);
router.get('/:id', ProductController.getProductById);

// Protected Product Management Endpoints
router.post(
    '/',
    authentication,
    upload.single('image'),
    ProductController.addProduct
);

router.put(
    '/:id',
    authentication,
    authorization,
    upload.single('image'),
    ProductController.updateProduct
);

router.delete(
    '/:id',
    authentication,
    authorization,
    ProductController.deleteProduct
);

module.exports = router;
