/**
 * Fresh Meadow Dairy CMS - Centralized Error Handling Middleware
 * Normalizes validation, authentication, authorization, database, and client errors.
 */

module.exports = (err, req, res, next) => {
    let status = err.status || 500;
    let msg = err.msg || err.message || 'Internal Server Error';

    switch (err.name) {
        case 'SequelizeValidationError':
        case 'SequelizeUniqueConstraintError':
            status = 400;
            msg = (err.errors && err.errors.length > 0)
                ? err.errors.map(e => e.message).join(', ')
                : (err.msg || 'Validation error');
            break;

        case 'SequelizeDatabaseError':
            status = 500;
            msg = err.message || 'Database error';
            break;

        case 'JsonWebTokenError':
        case 'TokenExpiredError':
            status = 401;
            msg = 'Invalid or expired token';
            break;

        case 'Data already exist':
            status = 400;
            msg = err.msg || 'Data already exists';
            break;

        case 'Unauthorized':
            status = err.status || 401;
            msg = err.msg || 'Unauthorized';
            break;

        case 'Forbidden':
            status = 403;
            msg = err.msg || "User doesn't have any access";
            break;

        case 'NotFound':
            status = 404;
            msg = err.msg || 'Resource not found';
            break;

        default:
            if (err.status) {
                status = err.status;
            }
            if (err.errors && err.errors[0] && err.errors[0].message) {
                msg = err.errors[0].message;
            }
            break;
    }

    return res.status(status).json({
        status,
        msg,
        message: msg
    });
};
