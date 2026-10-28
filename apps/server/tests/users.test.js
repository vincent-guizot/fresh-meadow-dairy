const request = require('supertest');
const app = require('../app.js');
const { sequelize, User } = require('../models');
const { tokenGenerator } = require('../helpers/jwt');

let authToken = '';
let testUser = null;

beforeAll(async () => {
    // Ensure clean state for test user
    const username = `test_admin_${Date.now()}`;
    const email = `${username}@freshmeadow.com`;
    testUser = await User.create({
        username,
        email,
        password: 'password123'
    });
    authToken = tokenGenerator(testUser);
});

afterAll(async () => {
    try {
        if (testUser) {
            await User.destroy({ where: { id: testUser.id } });
        }
        await sequelize.close();
    } catch (e) {
        // ignore
    }
});

describe('User Controller & Auth Flow', () => {
    describe('GET / (Home Route)', () => {
        test('Should return status 200 with home greeting', async () => {
            const res = await request(app).get('/');
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('message');
        });
    });

    describe('POST /users/register', () => {
        test('Should create a new user and return 201 without exposing password', async () => {
            const unique = Date.now();
            const res = await request(app).post('/users/register').send({
                username: `staff_${unique}`,
                email: `staff_${unique}@freshmeadow.com`,
                password: 'securepassword'
            });
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('user');
            expect(res.body.user).toHaveProperty('email');
            expect(res.body.user).not.toHaveProperty('password');
        });

        test('Should return 400 when registering with duplicate email', async () => {
            const res = await request(app).post('/users/register').send({
                username: `duplicate_${Date.now()}`,
                email: testUser.email,
                password: 'password123'
            });
            expect(res.status).toBe(400);
        });

        test('Should return 400 when required fields are missing', async () => {
            const res = await request(app).post('/users/register').send({
                username: '',
                password: ''
            });
            expect(res.status).toBe(400);
        });
    });

    describe('POST /users/login', () => {
        test('Should return 200 and access_token for valid credentials', async () => {
            const res = await request(app).post('/users/login').send({
                username: testUser.email,
                password: 'password123'
            });
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('access_token');
            expect(res.body).toHaveProperty('user');
            expect(res.body.user.email).toBe(testUser.email);
        });

        test('Should return 401 for wrong password', async () => {
            const res = await request(app).post('/users/login').send({
                username: testUser.email,
                password: 'wrongpassword'
            });
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty('msg');
        });

        test('Should return 401 for non-existent user', async () => {
            const res = await request(app).post('/users/login').send({
                username: 'nobody_exists@freshmeadow.com',
                password: 'password123'
            });
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty('msg');
        });

        test('Should return 401 when credentials are empty', async () => {
            const res = await request(app).post('/users/login').send({});
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty('msg');
        });
    });

    describe('GET /users (Protected Staff Directory)', () => {
        test('Should return 401 when token is missing', async () => {
            const res = await request(app).get('/users');
            expect(res.status).toBe(401);
            expect(res.body).toHaveProperty('msg');
        });

        test('Should return 200 and user list when Bearer token is provided', async () => {
            const res = await request(app)
                .get('/users')
                .set('Authorization', `Bearer ${authToken}`);
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            if (res.body.length > 0) {
                expect(res.body[0]).toHaveProperty('username');
                expect(res.body[0]).not.toHaveProperty('password');
            }
        });
    });

    describe('GET /users/me (Current User Profile)', () => {
        test('Should return 401 without authentication', async () => {
            const res = await request(app).get('/users/me');
            expect(res.status).toBe(401);
        });

        test('Should return 200 and authenticated profile with Bearer token', async () => {
            const res = await request(app)
                .get('/users/me')
                .set('Authorization', `Bearer ${authToken}`);
            expect(res.status).toBe(200);
            expect(res.body.id).toBe(testUser.id);
            expect(res.body.email).toBe(testUser.email);
        });
    });
});
