const request = require('supertest');
const app = require('../app');
const { User, Category, Product, Order, OrderItem, StockMovement } = require('../models');

describe('Orders, Categories & CMS Backend Endpoints', () => {
    let adminToken;
    let adminUser;
    let testCategory;
    let testProduct;

    beforeAll(async () => {
        // Register an admin user
        const adminEmail = `admin_test_${Date.now()}@freshmeadow.com`;
        const regRes = await request(app)
            .post('/users/register')
            .send({
                username: `adm_${Date.now()}`,
                email: adminEmail,
                password: 'password123',
                role: 'admin'
            });

        adminToken = regRes.body.access_token;
        adminUser = regRes.body.user;

        // Create test category
        testCategory = await Category.create({
            name: 'Test Milk',
            slug: `test-milk-${Date.now()}`,
            description: 'Test category'
        });

        // Create test product
        testProduct = await Product.create({
            name: `Test Fresh Milk ${Date.now()}`,
            info: 'Pure milk',
            category: 'Milk',
            CategoryId: testCategory.id,
            price: 30000,
            stock: 25,
            image: '/assets/prod-milk.png',
            UserId: adminUser.id
        });
    });

    afterAll(async () => {
        if (testProduct) await Product.destroy({ where: { id: testProduct.id } });
        if (testCategory) await Category.destroy({ where: { id: testCategory.id } });
        if (adminUser) await User.destroy({ where: { id: adminUser.id } });
    });

    describe('Categories Endpoints', () => {
        test('GET /categories should return 200 and list of categories', async () => {
            const res = await request(app).get('/categories');
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBeGreaterThan(0);
        });

        test('POST /categories should create category when authenticated', async () => {
            const res = await request(app)
                .post('/categories')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    name: 'Handcrafted Cheese',
                    slug: `cheese-${Date.now()}`,
                    description: 'Artisan cheese'
                });
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('id');
            expect(res.body.name).toBe('Handcrafted Cheese');

            // Cleanup
            await Category.destroy({ where: { id: res.body.id } });
        });
    });

    describe('Orders Endpoints & Status Progression', () => {
        let createdOrderId;

        test('POST /orders should create a new order and reduce product stock', async () => {
            const initialStock = testProduct.stock;
            const res = await request(app)
                .post('/orders')
                .send({
                    customerName: 'Ahmad Fauzi',
                    customerEmail: 'ahmad@mail.com',
                    customerPhone: '+62 812-9876-5432',
                    shippingAddress: 'Jl. Dago No. 12, Bandung',
                    deliverySlot: 'morning',
                    paymentMethod: 'QRIS',
                    subtotal: 60000,
                    shippingFee: 15000,
                    total: 75000,
                    items: [
                        {
                            id: testProduct.id,
                            name: testProduct.name,
                            price: testProduct.price,
                            quantity: 2,
                            image: testProduct.image
                        }
                    ]
                });

            expect(res.status).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body).toHaveProperty('orderId');
            createdOrderId = res.body.id;

            // Verify stock reduction
            const updatedProd = await Product.findByPk(testProduct.id);
            expect(updatedProd.stock).toBe(initialStock - 2);
        });

        test('GET /orders should return list of orders with items', async () => {
            const res = await request(app).get('/orders');
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            const found = res.body.find((o) => o.id === createdOrderId || o.orderId === createdOrderId);
            expect(found).toBeDefined();
        });

        test('PATCH /orders/:id/approve should allow admin to approve the order', async () => {
            const res = await request(app)
                .patch(`/orders/${createdOrderId}/approve`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send();

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.order.status).toBe('Confirmed');
        });

        test('PATCH /orders/:id/status should update order status to Preparing', async () => {
            const res = await request(app)
                .patch(`/orders/${createdOrderId}/status`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    status: 'Preparing',
                    note: 'Dikemas dalam foil box dingin'
                });

            expect(res.status).toBe(200);
            expect(res.body.order.status).toBe('Preparing');
        });

        test('PATCH /orders/:id/status should update order status to Shipped', async () => {
            const res = await request(app)
                .patch(`/orders/${createdOrderId}/status`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    status: 'Shipped',
                    note: 'Armada pendingin berangkat'
                });

            expect(res.status).toBe(200);
            expect(res.body.order.status).toBe('Shipped');
        });

        test('PATCH /orders/:id/status should update order status to Delivered', async () => {
            const res = await request(app)
                .patch(`/orders/${createdOrderId}/status`)
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    status: 'Delivered',
                    note: 'Pesanan diterima pelanggan'
                });

            expect(res.status).toBe(200);
            expect(res.body.order.status).toBe('Delivered');
        });
    });

    describe('Inventory & Overview Analytics', () => {
        test('GET /inventory should list inventory status', async () => {
            const res = await request(app).get('/inventory');
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
        });

        test('POST /inventory/record should record a stock harvest entry', async () => {
            const res = await request(app)
                .post('/inventory/record')
                .set('Authorization', `Bearer ${adminToken}`)
                .send({
                    productId: testProduct.id,
                    type: 'IN',
                    quantity: 10,
                    reason: 'Panen Subuh',
                    batchNumber: 'FMD-BATCH-01',
                    recordedBy: adminUser.username
                });

            expect(res.status).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.movement).toHaveProperty('id');
        });

        test('GET /overview/stats should return dynamic platform metrics', async () => {
            const res = await request(app).get('/overview/stats');
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('totalRevenue');
            expect(res.body).toHaveProperty('totalOrders');
            expect(res.body).toHaveProperty('totalProducts');
            expect(res.body).toHaveProperty('coldStorageTemp');
        });

        test('GET /users?role=customer should return only customers', async () => {
            const res = await request(app)
                .get('/users?role=customer')
                .set('Authorization', `Bearer ${adminToken}`);
            expect(res.status).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            res.body.forEach((u) => {
                expect(u.role).toBe('customer');
            });
        });
    });
});
