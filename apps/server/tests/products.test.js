const request = require('supertest');
const app = require('../app.js');
const { sequelize, User, Product } = require('../models');
const { tokenGenerator } = require('../helpers/jwt');

let ownerToken = '';
let otherUserToken = '';
let ownerUser = null;
let otherUser = null;
let createdProduct = null;

beforeAll(async () => {
    // Create Owner user
    const ownerName = `owner_${Date.now()}`;
    ownerUser = await User.create({
        username: ownerName,
        email: `${ownerName}@freshmeadow.com`,
        password: 'password123'
    });
    ownerToken = tokenGenerator(ownerUser);

    // Create Other user (for authorization check)
    const otherName = `other_${Date.now()}`;
    otherUser = await User.create({
        username: otherName,
        email: `${otherName}@freshmeadow.com`,
        password: 'password123'
    });
    otherUserToken = tokenGenerator(otherUser);
});

afterAll(async () => {
    try {
        if (createdProduct) {
            await Product.destroy({ where: { id: createdProduct.id } });
        }
        if (ownerUser) {
            await User.destroy({ where: { id: ownerUser.id } });
        }
        if (otherUser) {
            await User.destroy({ where: { id: otherUser.id } });
        }
        await sequelize.close();
    } catch (e) {
        // ignore
    }
});

describe('Product Controller & Dairy Management', () => {
    describe('GET /products', () => {
        test('Should return status 200 and list of products', async () => {
            const response = await request(app).get('/products');
            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe('POST /products (Create Dairy Product)', () => {
        test('Should reject product creation without authentication token (401)', async () => {
            const response = await request(app).post('/products').send({
                name: 'Fresh Whole Milk 1L',
                info: 'Pure whole cow milk',
                category: 'Milk',
                price: 28000,
                stock: 48
            });
            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty('msg');
        });

        test('Should reject product creation without image (400)', async () => {
            const response = await request(app)
                .post('/products')
                .set('Authorization', `Bearer ${ownerToken}`)
                .send({
                    name: 'Fresh Whole Milk 1L',
                    info: 'Pure whole cow milk',
                    category: 'Milk',
                    price: 28000,
                    stock: 48,
                    image: ''
                });
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('msg');
        });

        test('Should successfully create a dairy product with storage & expiry details (201)', async () => {
            const dairyPayload = {
                name: 'Fresh Whole Milk 1L - Batch FM',
                info: 'Farm-fresh pasteurized milk',
                category: 'Milk',
                image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150',
                price: 28000,
                stock: 48,
                volume: '1 Liter',
                storageTemp: 'Chilled (2°C - 4°C)',
                expiredDate: '2026-11-15'
            };

            const response = await request(app)
                .post('/products')
                .set('Authorization', `Bearer ${ownerToken}`)
                .send(dairyPayload);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.name).toBe(dairyPayload.name);
            expect(response.body.volume).toBe('1 Liter');
            expect(response.body.storageTemp).toBe('Chilled (2°C - 4°C)');
            expect(response.body.UserId).toBe(ownerUser.id);

            createdProduct = response.body;
        });
    });

    describe('GET /products/:id', () => {
        test('Should return status 200 and product details for existing product', async () => {
            const response = await request(app).get(`/products/${createdProduct.id}`);
            expect(response.status).toBe(200);
            expect(response.body.id).toBe(createdProduct.id);
            expect(response.body.name).toBe(createdProduct.name);
            expect(response.body).toHaveProperty('User');
        });

        test('Should return 404 for non-existent product ID', async () => {
            const response = await request(app).get('/products/99999999');
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty('msg');
        });
    });

    describe('PUT /products/:id (Update Dairy Product)', () => {
        test('Should return 401 when updating without authentication token', async () => {
            const response = await request(app)
                .put(`/products/${createdProduct.id}`)
                .send({ price: 30000 });
            expect(response.status).toBe(401);
        });

        test('Should return 403 when updating a product owned by another user', async () => {
            const response = await request(app)
                .put(`/products/${createdProduct.id}`)
                .set('Authorization', `Bearer ${otherUserToken}`)
                .send({ price: 30000 });
            expect(response.status).toBe(403);
            expect(response.body).toHaveProperty('msg');
        });

        test('Should return 200 when updated by the legitimate owner', async () => {
            const response = await request(app)
                .put(`/products/${createdProduct.id}`)
                .set('Authorization', `Bearer ${ownerToken}`)
                .send({
                    name: 'Fresh Whole Milk 1L - Updated',
                    price: 29000,
                    stock: 60
                });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id');
            expect(response.body.price).toBe(29000);
            expect(response.body.stock).toBe(60);
        });
    });

    describe('DELETE /products/:id (Delete Dairy Product)', () => {
        test('Should return 401 when deleting without authentication token', async () => {
            const response = await request(app).delete(`/products/${createdProduct.id}`);
            expect(response.status).toBe(401);
        });

        test('Should return 403 when deleting a product owned by another user', async () => {
            const response = await request(app)
                .delete(`/products/${createdProduct.id}`)
                .set('Authorization', `Bearer ${otherUserToken}`);
            expect(response.status).toBe(403);
        });

        test('Should return 200 when deleted by the product owner', async () => {
            const response = await request(app)
                .delete(`/products/${createdProduct.id}`)
                .set('Authorization', `Bearer ${ownerToken}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('msg');

            // Verify product is gone
            const check = await request(app).get(`/products/${createdProduct.id}`);
            expect(check.status).toBe(404);
            createdProduct = null;
        });

        test('Should return 404 when deleting a non-existent product', async () => {
            const response = await request(app)
                .delete('/products/99999999')
                .set('Authorization', `Bearer ${ownerToken}`);
            expect(response.status).toBe(404);
        });
    });
});
