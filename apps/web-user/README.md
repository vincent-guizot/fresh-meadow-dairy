# 🥛 Fresh Meadow Dairy - Web User Storefront

A high-performance, customer-facing digital e-commerce storefront for Fresh Meadow Dairy. Delivers an organic dairy browsing and ordering experience with cold-chain tracking and next-morning doorstep delivery scheduling.

## 🛠️ Tech Stack
- **Framework:** [Next.js](https://nextjs.org/) 14.x (App Router)
- **Language:** JavaScript (`.js` / `.jsx`)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with custom dairy color themes (`brand`, `cream`, `butter`, `cold`)
- **Component Primitives:** [Base UI](https://base-ui.com/) (`@base-ui-components/react`) for accessible headless Dialogs, Tabs, and interactive components
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) with client-side persistent cart storage
- **Animations:** [Framer Motion](https://www.framer.com/motion/) for fluid page transitions, drawer slides, and micro-interactions
- **HTTP Client:** [Axios](https://axios-http.com/) for communication with the Express.js API (`http://localhost:3120`)

---

## 🌟 Core Features
1. **Pastoral Brand Hero:**
   - Highlights 100% pasture-raised A2 Jersey dairy cows.
   - Live cold chain indicator (`2°C - 4°C Active Cold Chain`).
   - Quick navigation to catalog and delivery specifications.

2. **Dairy Catalog & Filtering:**
   - Filter by categories: *All Products, Fresh Milk, Greek Yogurt, Artisan Butter, Farm Cheese, Heavy Cream, Dairy Treats*.
   - Real-time search query across titles, descriptions, and categories.
   - Dynamic sorting: *Featured, Price: Low to High, Price: High to Low, Customer Rating*.

3. **Interactive Product Modal (Base UI Dialog + Tabs):**
   - Deep-dive product quick view with high-res dairy imagery.
   - Multi-tab specifications: *Story & Origin, Nutritional Breakdown, Cold Chain Storage Parameters*.
   - Quantity stepper and direct Add to Basket action.

4. **Slide-Over Basket Drawer (Zustand + Framer Motion):**
   - Real-time quantity manipulation (+/-) and line-item removals.
   - **Automated Cold-Chain Insulation Packaging:** Selectable thermal insulated box with gel ice packs (Free for orders over Rp 150.000).
   - **Delivery Slot Selector:** Choice between *Morning Harvest (06:00 - 08:00 AM)* and *Afternoon Drop (03:00 - 05:00 PM)*.
   - Transparent bill breakdown with subtotal, cold pack fee, delivery fee, and grand total.

5. **Cold-Chain Delivery Checkout Modal (Base UI Dialog):**
   - Recipient contact details and address capture.
   - Delivery instructions for morning porch placement.
   - Payment method selection: *QRIS / e-Wallets, Virtual Account, Chilled Cash on Delivery*.
   - Order simulation with instant dispatch confirmation ID.

6. **Cold Chain Guarantee Banner & Farm Story:**
   - Educational 4-step cold-chain journey from robotic milking parlor to porch drop.
   - Circular glass bottle return incentive program.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd apps/web-user
yarn install
```

### 2. Run Development Server
```bash
yarn dev
# Access the storefront at http://localhost:3130
```

### 3. Production Build & Start
```bash
yarn build
yarn start
```
