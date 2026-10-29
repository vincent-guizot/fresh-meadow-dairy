/**
 * Fresh Meadow Dairy CMS - Product Controller
 * Handles dairy product catalog management, cold chain storage tracking, and CRUD operations.
 */

const { Product, User, Category } = require('../models');
const { uploadToCloudinaryOrLocal } = require('../helpers/uploadImage');
const { Op } = require('sequelize');

class ProductController {
    /**
     * Standard associations for product queries
     */
    static get defaultAssociations() {
        return [
            {
                model: User,
                attributes: ['id', 'username', 'email']
            },
            {
                model: Category,
                as: 'categoryDetail',
                required: false,
                attributes: ['id', 'name', 'slug', 'icon']
            }
        ];
    }

    /**
     * GET /products
     * Retrieve all dairy catalog products.
     */
    static async getProduct(req, res, next) {
        try {
            const { category, search } = req.query;
            const where = {};

            if (category && category !== 'all') {
                where[Op.or] = [
                    { category: { [Op.iLike]: `%${category}%` } }
                ];
            }

            if (search) {
                where[Op.or] = [
                    { name: { [Op.iLike]: `%${search}%` } },
                    { info: { [Op.iLike]: `%${search}%` } }
                ];
            }

            const products = await Product.findAll({
                where,
                order: [['id', 'ASC']],
                include: ProductController.defaultAssociations
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
                include: ProductController.defaultAssociations
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
                CategoryId,
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

            // Resolve CategoryId
            let catId = CategoryId ? Number(CategoryId) : null;
            if (!catId && category) {
                const found = await Category.findOne({
                    where: {
                        [Op.or]: [
                            { name: { [Op.iLike]: category } },
                            { slug: { [Op.iLike]: category.toLowerCase() } }
                        ]
                    }
                });
                if (found) catId = found.id;
            }

            const product = await Product.create({
                name,
                info,
                category: category || 'Milk',
                CategoryId: catId,
                image: imageUrl,
                price: Number(price),
                stock: Number(stock),
                volume: volume || '1 Liter',
                expiredDate: expiredDate || null,
                storageTemp: storageTemp || 'Chilled (2°C - 4°C)',
                UserId
            });

            const result = await Product.findByPk(product.id, {
                include: ProductController.defaultAssociations
            });

            return res.status(201).json(result);
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
                CategoryId,
                price,
                stock,
                volume,
                expiredDate,
                storageTemp
            } = req.body;

            const currentProduct = req.product || await Product.findByPk(id);

            if (!currentProduct) {
                return next({
                    name: 'NotFound',
                    status: 404,
                    msg: 'Product not found'
                });
            }

            let imageUrl = currentProduct.image;
            if (req.file) {
                imageUrl = await uploadToCloudinaryOrLocal(req.file, req);
            } else if (req.body.image) {
                imageUrl = req.body.image;
            }

            let catId = CategoryId !== undefined ? Number(CategoryId) : currentProduct.CategoryId;
            if (!catId && category) {
                const found = await Category.findOne({
                    where: {
                        [Op.or]: [
                            { name: { [Op.iLike]: category } },
                            { slug: { [Op.iLike]: category.toLowerCase() } }
                        ]
                    }
                });
                if (found) catId = found.id;
            }

            await Product.update(
                {
                    name: name ?? currentProduct.name,
                    info: info ?? currentProduct.info,
                    category: category ?? currentProduct.category,
                    CategoryId: catId,
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

            const updatedProduct = await Product.findByPk(id, {
                include: ProductController.defaultAssociations
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
