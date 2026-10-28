/**
 * Fresh Meadow Dairy CMS - Product Controller
 * Handles dairy product catalog management, cold chain storage tracking, and CRUD operations.
 */

const { Product, User } = require('../models');
const { uploadToCloudinaryOrLocal } = require('../helpers/uploadImage');

class ProductController {
    /**
     * Standard User association options for product queries
     */
    static get userAssociation() {
        return {
            model: User,
            attributes: ['id', 'username', 'email']
        };
    }

    /**
     * GET /products
     * Retrieve all dairy catalog products.
     */
    static async getProduct(req, res, next) {
        try {
            const products = await Product.findAll({
                order: [['id', 'ASC']],
                include: [ProductController.userAssociation]
            });

            return res.status(200).json(products);
        } catch (err) {
            return next(err);
        }
    }

    /**
     * GET /products/:id
     * Retrieve a single product by primary key ID.
     */
    static async getProductById(req, res, next) {
        try {
            const { id } = req.params;
            const product = await Product.findByPk(id, {
                include: [ProductController.userAssociation]
            });

            if (!product) {
                return next({
                    name: 'NotFound',
                    status: 404,
                    msg: 'Product not found'
                });
            }

            return res.status(200).json(product);
        } catch (err) {
            return next(err);
        }
    }

    /**
     * POST /products
     * Create a new dairy product item with storage parameters and image.
     */
    static async addProduct(req, res, next) {
        try {
            const {
                name,
                info,
                category,
                price,
                stock,
                volume,
                expiredDate,
                storageTemp
            } = req.body;

            const UserId = req.userData && req.userData.id;

            // Resolve uploaded file or direct image URL
            let imageUrl = req.body.image || '';
            if (req.file) {
                imageUrl = await uploadToCloudinaryOrLocal(req.file, req);
            }

            if (!imageUrl) {
                return next({
                    name: 'SequelizeValidationError',
                    status: 400,
                    msg: 'Product image is required (upload a file or provide an image URL)'
                });
            }

            const product = await Product.create({
                name,
                info,
                category,
                image: imageUrl,
                price: Number(price),
                stock: Number(stock),
                volume: volume || '1 Liter',
                expiredDate: expiredDate || null,
                storageTemp: storageTemp || 'Chilled (2°C - 4°C)',
                UserId
            });

            return res.status(201).json(product);
        } catch (err) {
            return next(err);
        }
    }

    /**
     * PUT /products/:id
     * Update an existing product (authorized for owner/creator).
     */
    static async updateProduct(req, res, next) {
        try {
            const { id } = req.params;
            const {
                name,
                info,
                category,
                price,
                stock,
                volume,
                expiredDate,
                storageTemp
            } = req.body;

            // Product instance pre-fetched by authorization middleware or fallback find
            const currentProduct = req.product || await Product.findByPk(id);

            if (!currentProduct) {
                return next({
                    name: 'NotFound',
                    status: 404,
                    msg: 'Product not found'
                });
            }

            // Determine image URL
            let imageUrl = currentProduct.image;
            if (req.file) {
                imageUrl = await uploadToCloudinaryOrLocal(req.file, req);
            } else if (req.body.image) {
                imageUrl = req.body.image;
            }

            // Perform partial / full update
            await Product.update(
                {
                    name: name ?? currentProduct.name,
                    info: info ?? currentProduct.info,
                    category: category ?? currentProduct.category,
                    image: imageUrl,
                    price: price !== undefined ? Number(price) : currentProduct.price,
                    stock: stock !== undefined ? Number(stock) : currentProduct.stock,
                    volume: volume ?? currentProduct.volume,
                    expiredDate: expiredDate !== undefined ? expiredDate : currentProduct.expiredDate,
                    storageTemp: storageTemp ?? currentProduct.storageTemp
                },
                {
                    where: { id }
                }
            );

            // Fetch refreshed product with owner association
            const updatedProduct = await Product.findByPk(id, {
                include: [ProductController.userAssociation]
            });

            return res.status(200).json(updatedProduct);
        } catch (err) {
            return next(err);
        }
    }

    /**
     * DELETE /products/:id
     * Remove a product from the database catalog.
     */
    static async deleteProduct(req, res, next) {
        try {
            const { id } = req.params;
            const deletedCount = await Product.destroy({
                where: { id }
            });

            if (deletedCount === 0) {
                return next({
                    name: 'NotFound',
                    status: 404,
                    msg: 'Product not found'
                });
            }

            return res.status(200).json({
                msg: 'Product deleted successfully',
                id: Number(id)
            });
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = ProductController;
