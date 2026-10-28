# 🥛 Fresh Meadow Dairy - Server API

The core backend service for Fresh Meadow Dairy. Built with Express.js and Sequelize ORM on PostgreSQL, providing a robust RESTful API for inventory, products, orders, authentication, and cold-chain compliance.

## 🚀 Features
- **Authentication & Authorization:** JWT-based stateless tokens with bcrypt password hashing and role permissions.
- **Dairy Catalog & Cold Chain:** Full product lifecycle management with cold-storage temperature thresholds and shelf-life tracking.
- **PostgreSQL Database:** Automated migrations and seeders configured for database `cms-fmd` on port `1000`.
- **Automated Testing:** Comprehensive Jest + Supertest suites with 100% test pass rate.

## 📦 Scripts
- `yarn dev` / `yarn start` - Run local API development server with nodemon
- `yarn test` - Run Jest test suite
- `yarn run create_migrate` - Initialize database and run migrations
- `yarn run migrate` - Apply pending migrations
- `yarn run seed` - Seed dairy catalog and initial accounts
- `yarn run db:reset` - Teardown and re-seed database
