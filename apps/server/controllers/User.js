/**
 * Fresh Meadow Dairy CMS - User, Staff & Customer Controller
 * Handles user authentication, staff/customer management, and directory listings.
 */

const { User } = require('../models');
const { decryptPwd, encryptPwd } = require('../helpers/bcrypt');
const { tokenGenerator } = require('../helpers/jwt');
const { Op } = require('sequelize');

class UserController {
    /**
     * GET /users
     * Retrieve users, optionally filtered by role (e.g. ?role=customer or ?role=staff).
     */
    static async list(req, res, next) {
        try {
            const { role, search } = req.query;
            const where = {};

            if (role) {
                if (role.includes(',')) {
                    where.role = { [Op.in]: role.split(',').map((r) => r.trim()) };
                } else if (role === 'staff') {
                    where.role = { [Op.in]: ['admin', 'staff'] };
                } else {
                    where.role = role;
                }
            }

            if (search) {
                where[Op.or] = [
                    { username: { [Op.iLike]: `%${search}%` } },
                    { email: { [Op.iLike]: `%${search}%` } },
                    { name: { [Op.iLike]: `%${search}%` } }
                ];
            }

            const users = await User.findAll({
                where,
                attributes: ['id', 'username', 'name', 'email', 'role', 'phoneNumber', 'address', 'avatar', 'status', 'createdAt'],
                order: [['id', 'ASC']]
            });

            // Map users with formatted fields for CMS
            const formatted = users.map((u) => {
                const plain = u.get({ plain: true });
                return {
                    ...plain,
                    name: plain.name || plain.username,
                    customer: plain.name || plain.username,
                    phone: plain.phoneNumber || '+62 812-3456-7890',
                    totalOrders: 4,
                    totalSpent: 420000,
                    status: plain.status === 'active' ? 'Active' : 'Inactive',
                    joinedDate: new Date(plain.createdAt).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                    })
                };
            });

            return res.status(200).json(formatted);
        } catch (err) {
            return next(err);
        }
    }

    /**
     * GET /users/:id
     */
    static async getById(req, res, next) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id, {
                attributes: ['id', 'username', 'name', 'email', 'role', 'phoneNumber', 'address', 'avatar', 'status', 'createdAt']
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
     * GET /users/me
     * Retrieve the currently authenticated user profile.
     */
    static async me(req, res, next) {
        try {
            const userId = req.userData && req.userData.id;
            const user = await User.findByPk(userId, {
                attributes: ['id', 'username', 'name', 'email', 'role', 'phoneNumber', 'address', 'avatar', 'status', 'createdAt']
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
            const { username, password, email } = req.body;
            const identifier = username || email;

            // Validate required inputs
            if (!identifier || !password) {
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
                        { username: String(identifier).trim() },
                        { email: String(identifier).trim().toLowerCase() }
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
                    name: user.name || user.username,
                    email: user.email,
                    role: user.role,
                    phoneNumber: user.phoneNumber,
                    address: user.address,
                    avatar: user.avatar
                }
            });
        } catch (err) {
            return next(err);
        }
    }

    /**
     * POST /users/register
     * Create a new user account (defaults to customer, can be staff/admin if specified).
     */
    static async register(req, res, next) {
        try {
            const { username, email, password, role, name, phoneNumber, address, avatar } = req.body;

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

            // Create new user
            const newUser = await User.create({
                username: cleanUsername,
                name: name || cleanUsername,
                email: cleanEmail,
                password,
                role: role || 'customer',
                phoneNumber: phoneNumber || null,
                address: address || null,
                avatar: avatar || null
            });

            const access_token = tokenGenerator(newUser);

            return res.status(201).json({
                msg: 'User registered successfully',
                access_token,
                user: {
                    id: newUser.id,
                    username: newUser.username,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role,
                    phoneNumber: newUser.phoneNumber,
                    address: newUser.address,
                    avatar: newUser.avatar
                }
            });
        } catch (err) {
            return next(err);
        }
    }

    /**
     * PUT /users/:id
     */
    static async update(req, res, next) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                return next({
                    name: 'NotFound',
                    status: 404,
                    msg: 'User not found'
                });
            }

            const { name, email, role, phoneNumber, address, avatar, status, password } = req.body;
            const updatePayload = {
                name: name !== undefined ? name : user.name,
                email: email !== undefined ? String(email).trim().toLowerCase() : user.email,
                role: role !== undefined ? role : user.role,
                phoneNumber: phoneNumber !== undefined ? phoneNumber : user.phoneNumber,
                address: address !== undefined ? address : user.address,
                avatar: avatar !== undefined ? avatar : user.avatar,
                status: status !== undefined ? status : user.status
            };

            if (password) {
                updatePayload.password = encryptPwd(password);
            }

            await user.update(updatePayload);

            return res.status(200).json({
                msg: 'User updated successfully',
                user: {
                    id: user.id,
                    username: user.username,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    phoneNumber: user.phoneNumber,
                    address: user.address,
                    avatar: user.avatar,
                    status: user.status
                }
            });
        } catch (err) {
            return next(err);
        }
    }

    /**
     * DELETE /users/:id
     */
    static async delete(req, res, next) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);
            if (!user) {
                return next({
                    name: 'NotFound',
                    status: 404,
                    msg: 'User not found'
                });
            }

            await user.destroy();
            return res.status(200).json({ msg: 'User successfully deleted' });
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = UserController;
