/**
 * Fresh Meadow Dairy CMS - Authentication & Authorization Middlewares
 */

const { Product } = require('../models');
const { tokenVerifier } = require('../helpers/jwt');

/**
 * Authentication Middleware:
 * Verifies JWT token supplied via `Authorization: Bearer <token>` or `access_token` header.
 */
const authentication = (req, res, next) => {
    let token = req.headers.authorization;
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7).trim();
    } else if (req.headers.access_token) {
        token = req.headers.access_token;
    }

    if (!token) {
        return next({
            name: 'Unauthorized',
            status: 401,
            msg: 'Authentication token is missing'
        });
    }

    try {
        const decoded = tokenVerifier(token);
        req.userData = decoded;
        req.user = decoded;
        return next();
    } catch (err) {
        return next(err);
    }
};

/**
 * Product Authorization Middleware:
 * Verifies that the authenticated user owns or has permission to update/delete the product.
 */
const authorization = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.userData && req.userData.id;

        const product = await Product.findByPk(id);
        if (!product) {
            return next({
                name: 'NotFound',
                status: 404,
                msg: 'Product not found'
            });
        }

        if (product.UserId !== userId) {
            return next({
                name: 'Forbidden',
                status: 403,
                msg: 'You do not have permission to modify this product'
            });
        }

        req.product = product;
        return next();
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    authentication,
    authorization
};
