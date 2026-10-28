# 🥛 Fresh Meadow Dairy - Monorepo

Fresh Meadow Dairy is an end-to-end farm-to-table dairy management platform and direct-to-consumer digital storefront. Built as a high-performance monorepo, it unites our internal Content Management System (CMS), cold-chain REST API server, and consumer e-commerce storefront.

---

## 🏗️ Monorepo Architecture

```
fresh-meadow-dairy/
├── apps/
│   ├── cms/          # Dairy Administration & Inventory Portal (React 18 + Vite + Tailwind CSS v4)
│   ├── server/       # Core RESTful API & Cold-Chain Management (Express.js + Sequelize + PostgreSQL)
│   └── web-user/     # Direct-to-Consumer Organic Dairy Storefront (React 18 + Vite + Tailwind CSS v4)
├── screenshots/      # UI design specifications & feature reference captures
└── README.md
```

---

## 📦 Applications & Tech Stacks

### 1. `apps/cms` (Dairy Operations & Management Portal)
- **Framework:** React 18 with Vite bundling
- **Styling:** Tailwind CSS v4 with custom design system CSS variables in `src/styles/`
- **Architecture:** Clean component hierarchy with custom hooks (`useAuth`, `useProducts`), service layers, and React Portal-based confirmation modals for destructive and critical actions (Add/Edit Product, Add/Edit Category, Record Stock, Add Staff, Add Customer)
- **Features:**
  - Overview dashboard with cold-storage metrics & inventory alerts
  - Product catalog management with cold-chain storage parameters (temperature, shelf life)
  - Batch stock recording & real-time inventory adjustments
  - Category taxonomy management
  - Order fulfillment & payment tracking
  - Staff role-based access control & customer registries
  - Enhanced Login layout featuring pastoral branding (`login.png`, translucent `login0hero.png`)

### 2. `apps/server` (REST API & Business Logic Engine)
- **Framework:** Express.js 4.x
- **ORM / Database:** Sequelize ORM with PostgreSQL (Port: `1000`, Database: `cms-fmd`)
- **Architecture:** Refactored MVC structure (`controllers/`, `routes/`, `middlewares/`, `helpers/`)
- **Authentication & Security:** JWT (JSON Web Tokens) with Bcrypt hashing and role-based ownership authorization
- **Testing:** 100% passing automated test suite (`jest` & `supertest`) covering authentication and full Product CRUD lifecycle

### 3. `apps/web-user` (Customer-Facing E-Commerce Storefront)
- **Framework:** React 18 with Vite
- **Styling:** Tailwind CSS v4 featuring Fresh Meadow brand palette (`#2c5d3f` Forest Green, `#f9f6f0` Milk Cream, `#e6b15c` Golden Butter)
- **Features:**
  - Fresh dairy product catalog (Pasteurized Milks, Greek Yogurts, Cultured Butters, Artisanal Cheeses)
  - Cold-chain temperature disclosures and fresh shelf-life indicators
  - Interactive shopping cart with temperature-controlled packaging fee calculation
  - Next-morning farm-fresh delivery scheduler and express checkout simulation

---

## 🚀 Getting Started

### Prerequisites
- **Node.js:** v18.x or v20+
- **Package Manager:** `yarn`
- **Database:** PostgreSQL running on port `1000`

### 1. Database Setup
Ensure PostgreSQL is running on port `1000`. Create the database and run migrations:
```bash
# Navigate to server
cd apps/server

# Install dependencies
yarn install

# Create database and run migrations
yarn run db:create
yarn run db:migrate
yarn run db:seed:all
```

### 2. Running the Server (API)
```bash
cd apps/server
yarn dev
# Server runs on http://localhost:1000 (or configured PORT)
```

### 3. Running the CMS (Admin Portal)
```bash
cd apps/cms
yarn install
yarn dev
# CMS runs on http://localhost:5173
```

### 4. Running the Web Storefront
```bash
cd apps/web-user
yarn install
yarn dev
# Web Storefront runs on http://localhost:5174
```

---

## 🧪 Automated Testing

The backend API includes a comprehensive test suite executed with Jest:

```bash
cd apps/server
yarn test
```

**Test Coverage Summary:**
- ✅ `POST /users/login` - Successful authentication, invalid email, wrong password, missing fields (401 validation)
- ✅ `POST /users/register` - User registration, duplicate email prevention, validation rules
- ✅ `GET /products` - Fetching active product listings
- ✅ `POST /products` - Creating products with cold-chain storage parameters
- ✅ `PUT /products/:id` - Updating product details and ownership validation
- ✅ `DELETE /products/:id` - Safe removal and inventory cleanup

---

## 🎨 Design System & Visual Assets
Design captures and reference screenshots for the CMS interfaces are located in the [`screenshots/`](./screenshots) directory:
- `Overview.png` - Dashboard and key operational metrics
- `Products.png` & `Add Product.png` - Product catalog and creation workflows
- `Categories.png` & `Add Category.png` - Category taxonomy forms
- `Inventory.png` & `Record Stock.png` - Warehouse cold-storage tracking
- `Orders.png` & `Payments.png` - Logistics and settlement records
- `Staff.png` & `Add Staff.png` - Staff administration
- `Customers.png` & `Add Customer.png` - Customer directory
- `Login.png` - Dual-panel branded login interface

---

## 📄 License
MIT © Vincent Guizot
