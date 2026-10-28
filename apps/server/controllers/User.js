/**
 * Fresh Meadow Dairy CMS - User & Staff Controller
 * Handles user authentication, staff registration, and directory listing.
 */

const { User } = require('../models');
const { decryptPwd } = require('../helpers/bcrypt');
const { tokenGenerator } = require('../helpers/jwt');
const { Op } = require('sequelize');

class UserController {
    /**
     * GET /users
     * Retrieve all registered staff/users (without password hash).
     */
    static async list(req, res, next) {
        try {
            const users = await User.findAll({
                attributes: ['id', 'username', 'email', 'createdAt'],
                order: [['id', 'ASC']]
            });

            return res.status(200).json(users);
        } catch (err) {
            return next(err);
        }
    }

    /**
     * GET /users/me
     * Retrieve the currently authenticated user profile.
     */
    static async me(req, res, next) {
        try {
            const userId = req.userData && req.userData.id;
            const user = await User.findByPk(userId, {
                attributes: ['id', 'username', 'email', 'createdAt']
            });

            if (!user) {
                return next({
                    name: 'NotFound',
                    status: 404,
                    msg: 'User not found'
                });
            }

            return res.status(200).json(user);
        } catch (err) {
            return next(err);
        }
    }

    /**
     * POST /users/login
     * Authenticate user credentials and return a signed JWT token.
     */
    static async login(req, res, next) {
        try {
            const { username, password } = req.body;

            // Validate required inputs
            if (!username || !password) {
                return next({
                    name: 'Unauthorized',
                    status: 401,
                    msg: 'Username and password are required'
                });
            }

            // Find user by either username or email
            const user = await User.findOne({
                where: {
                    [Op.or]: [
                        { username: String(username).trim() },
                        { email: String(username).trim().toLowerCase() }
                    ]
                }
            });

            // Verify password using bcrypt helper
            if (!user || !decryptPwd(password, user.password)) {
                return next({
                    name: 'Unauthorized',
                    status: 401,
                    msg: 'Invalid username or password'
                });
            }

            // Generate JWT payload
            const access_token = tokenGenerator(user);

            return res.status(200).json({
                access_token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            });
        } catch (err) {
            return next(err);
        }
    }

    /**
     * POST /users/register
     * Create a new staff or admin user account.
     */
    static async register(req, res, next) {
        try {
            const { username, email, password } = req.body;

            // Validate required fields
            if (!username || !email || !password) {
                return next({
                    name: 'SequelizeValidationError',
                    status: 400,
                    msg: 'Username, email, and password are required'
                });
            }

            const cleanUsername = String(username).trim();
            const cleanEmail = String(email).trim().toLowerCase();

            // Check if username or email already exists
            const existingUser = await User.findOne({
                where: {
                    [Op.or]: [
                        { username: cleanUsername },
                        { email: cleanEmail }
                    ]
                }
            });

            if (existingUser) {
                const isUsernameDuplicate = existingUser.username.toLowerCase() === cleanUsername.toLowerCase();
                return next({
                    name: 'Data already exist',
                    status: 400,
                    msg: isUsernameDuplicate
                        ? 'Username already taken'
                        : 'Email already registered'
                });
            }

            // Create new user (password is automatically hashed by model hooks)
            const newUser = await User.create({
                username: cleanUsername,
                email: cleanEmail,
                password
            });

            return res.status(201).json({
                msg: 'User registered successfully',
                user: {
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email
                }
            });
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = UserController;
