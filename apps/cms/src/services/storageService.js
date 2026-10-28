import {
  initialProducts,
  initialCategories,
  initialOrders,
  initialTransactions,
  initialPayments,
  initialCustomers,
  initialStaff,
  initialInventory,
  initialStockMovements,
  initialSettings
} from '../data/mockData';

const STORAGE_KEYS = {
  PRODUCTS: 'fmd_products',
  CATEGORIES: 'fmd_categories',
  ORDERS: 'fmd_orders',
  TRANSACTIONS: 'fmd_transactions',
  PAYMENTS: 'fmd_payments',
  CUSTOMERS: 'fmd_customers',
  STAFF: 'fmd_staff',
  INVENTORY: 'fmd_inventory',
  STOCK_MOVEMENTS: 'fmd_stock_movements',
  SETTINGS: 'fmd_settings',
  CURRENT_USER: 'fmd_current_user',
  TIME_FILTER: 'fmd_time_filter'
};

const getOrInit = (key, initialValue) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(initialValue));
      return initialValue;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${key} from localStorage`, err);
    return initialValue;
  }
};

const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error writing ${key} to localStorage`, err);
  }
};

// Default authenticated user (Vincent Guizot - Admin)
const DEFAULT_USER = {
  id: 'staff-1',
  name: 'Vincent Guizot',
  email: 'vincent@freshmeadow.com',
  role: 'Admin',
  avatar: '/assets/user-vincent.png'
};

export const storageService = {
  // Auth
  getCurrentUser() {
    return getOrInit(STORAGE_KEYS.CURRENT_USER, DEFAULT_USER);
  },

  setCurrentUser(user) {
    setItem(STORAGE_KEYS.CURRENT_USER, user);
  },

  login(email, password) {
    const staffList = this.getStaff();
    const found = staffList.find(s => s.email.toLowerCase() === email.trim().toLowerCase());
    if (found) {
      if (found.status === 'Suspended') {
        throw new Error('This account has been suspended. Please contact your administrator.');
      }
      const userSession = {
        id: found.id,
        name: found.name,
        email: found.email,
        role: found.role,
        avatar: found.avatar || '/assets/user-vincent.png'
      };
      this.setCurrentUser(userSession);
      return userSession;
    }

    // Demo fallback: default to Admin if demo credentials
    if (email.includes('admin') || email.includes('freshmeadow')) {
      this.setCurrentUser(DEFAULT_USER);
      return DEFAULT_USER;
    }

    throw new Error('Invalid email or password. Only accounts provisioned by an administrator can sign in.');
  },

  logout() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  // Time filter preference
  getTimeFilter() {
    return localStorage.getItem(STORAGE_KEYS.TIME_FILTER) || 'Last 7 days';
  },

  setTimeFilter(filter) {
    localStorage.setItem(STORAGE_KEYS.TIME_FILTER, filter);
  },

  // Products
  getProducts() {
    return getOrInit(STORAGE_KEYS.PRODUCTS, initialProducts);
  },

  getProductById(id) {
    const list = this.getProducts();
    return list.find(p => p.id === id || p.sku === id) || null;
  },

  saveProduct(productData) {
    const list = this.getProducts();
    let updated;
    if (productData.id && list.some(p => p.id === productData.id)) {
      updated = list.map(p => (p.id === productData.id ? { ...p, ...productData, updatedAt: 'Today' } : p));
    } else {
      const newProduct = {
        ...productData,
        id: productData.id || `prod-${Date.now()}`,
        updatedAt: 'Today'
      };
      updated = [newProduct, ...list];
    }
    setItem(STORAGE_KEYS.PRODUCTS, updated);

    // Sync inventory record
    this.syncInventoryFromProduct(productData);

    return updated;
  },

  deleteProduct(id) {
    const list = this.getProducts();
    const updated = list.filter(p => p.id !== id);
    setItem(STORAGE_KEYS.PRODUCTS, updated);
    return updated;
  },

  toggleProductStatus(id) {
    const list = this.getProducts();
    const updated = list.map(p => {
      if (p.id === id) {
        const nextStatus = p.status === 'Active' ? 'Inactive' : 'Active';
        return { ...p, status: nextStatus, updatedAt: 'Today' };
      }
      return p;
    });
    setItem(STORAGE_KEYS.PRODUCTS, updated);
    return updated;
  },

  // Categories
  getCategories() {
    return getOrInit(STORAGE_KEYS.CATEGORIES, initialCategories);
  },

  getCategoryById(id) {
    const list = this.getCategories();
    return list.find(c => c.id === id || c.slug === id) || null;
  },

  saveCategory(catData) {
    const list = this.getCategories();
    let updated;
    if (catData.id && list.some(c => c.id === catData.id)) {
      updated = list.map(c => (c.id === catData.id ? { ...c, ...catData, updatedAt: 'Today' } : c));
    } else {
      const newCategory = {
        ...catData,
        id: catData.id || `cat-${Date.now()}`,
        productsCount: catData.productsCount || 0,
        displayOrder: catData.displayOrder || list.length + 1,
        updatedAt: 'Today'
      };
      updated = [...list, newCategory];
    }
    setItem(STORAGE_KEYS.CATEGORIES, updated);
    return updated;
  },

  deleteCategory(id) {
    const list = this.getCategories();
    const updated = list.filter(c => c.id !== id);
    setItem(STORAGE_KEYS.CATEGORIES, updated);
    return updated;
  },

  reorderCategories(orderedIds) {
    const list = this.getCategories();
    const idMap = new Map(list.map(c => [c.id, c]));
    const updated = orderedIds.map((id, index) => {
      const cat = idMap.get(id);
      return { ...cat, displayOrder: index + 1 };
    });
    setItem(STORAGE_KEYS.CATEGORIES, updated);
    return updated;
  },

  // Inventory & Stock Movements
  getInventory() {
    return getOrInit(STORAGE_KEYS.INVENTORY, initialInventory);
  },

  getStockMovements() {
    return getOrInit(STORAGE_KEYS.STOCK_MOVEMENTS, initialStockMovements);
  },

  syncInventoryFromProduct(product) {
    const inventoryList = this.getInventory();
    const existingIndex = inventoryList.findIndex(i => i.productId === product.id || i.sku === product.sku);
    const status = product.stock <= 0 ? 'Out of stock' : (product.stock <= product.lowStockThreshold ? 'Low stock' : 'Healthy');
    
    if (existingIndex >= 0) {
      inventoryList[existingIndex] = {
        ...inventoryList[existingIndex],
        available: product.stock,
        lowStockAt: product.lowStockThreshold,
        status: status,
        lastUpdated: 'Today'
      };
      setItem(STORAGE_KEYS.INVENTORY, inventoryList);
    }
  },

  recordStockMovement(movementData) {
    const movements = this.getStockMovements();
    const inventoryList = this.getInventory();
    const productList = this.getProducts();

    const newMovement = {
      ...movementData,
      id: `mov-${Date.now()}`,
      timestamp: 'Today, Just now'
    };
    const updatedMovements = [newMovement, ...movements];
    setItem(STORAGE_KEYS.STOCK_MOVEMENTS, updatedMovements);

    const qty = parseInt(movementData.quantity, 10) || 0;
    const isAddition = movementData.type === 'Stock Received';

    // Update Product stock
    const updatedProducts = productList.map(p => {
      if (p.id === movementData.productId || p.sku === movementData.sku) {
        const nextStock = isAddition ? (p.stock + qty) : qty;
        const nextStatus = nextStock <= 0 ? 'Out of Stock' : (nextStock <= p.lowStockThreshold ? 'Low Stock' : 'Active');
        return {
          ...p,
          stock: Math.max(0, nextStock),
          batchNumber: movementData.batchNumber || p.batchNumber,
          expiryDate: movementData.expiryDate || p.expiryDate,
          status: nextStatus,
          updatedAt: 'Today'
        };
      }
      return p;
    });
    setItem(STORAGE_KEYS.PRODUCTS, updatedProducts);

    // Update Inventory
    const invIndex = inventoryList.findIndex(i => i.productId === movementData.productId || i.sku === movementData.sku);
    if (invIndex >= 0) {
      const current = inventoryList[invIndex];
      const nextStock = isAddition ? (current.available + qty) : qty;
      const nextStatus = nextStock <= 0 ? 'Out of stock' : (nextStock <= current.lowStockAt ? 'Low stock' : 'Healthy');
      inventoryList[invIndex] = {
        ...current,
        available: Math.max(0, nextStock),
        batchNumber: movementData.batchNumber || current.batchNumber,
        expiryDate: movementData.expiryDate || current.expiryDate,
        storageType: movementData.storageType || current.storageType,
        tempRange: movementData.tempRange || current.tempRange,
        status: nextStatus,
        lastUpdated: 'Today, Just now'
      };
      setItem(STORAGE_KEYS.INVENTORY, inventoryList);
    }

    return { movements: updatedMovements, inventory: inventoryList, products: updatedProducts };
  },

  // Orders
  getOrders() {
    return getOrInit(STORAGE_KEYS.ORDERS, initialOrders);
  },

  getOrderById(id) {
    const list = this.getOrders();
    return list.find(o => o.id === id) || null;
  },

  updateOrderStatus(orderId, nextStatus) {
    const list = this.getOrders();
    const updated = list.map(o => {
      if (o.id === orderId) {
        const timeline = [
          ...(o.timeline || []),
          {
            title: `Status changed to ${nextStatus}`,
            time: 'Today, Just now',
            note: 'Updated by Staff through Orders Management'
          }
        ];
        return { ...o, status: nextStatus, timeline };
      }
      return o;
    });
    setItem(STORAGE_KEYS.ORDERS, updated);
    return updated;
  },

  // Transactions
  getTransactions() {
    return getOrInit(STORAGE_KEYS.TRANSACTIONS, initialTransactions);
  },

  getTransactionById(id) {
    const list = this.getTransactions();
    return list.find(t => t.id === id || t.orderId === id) || null;
  },

  // Payments
  getPayments() {
    return getOrInit(STORAGE_KEYS.PAYMENTS, initialPayments);
  },

  verifyPayment(paymentId) {
    const payments = this.getPayments();
    const transactions = this.getTransactions();
    const orders = this.getOrders();

    const payment = payments.find(p => p.id === paymentId);
    if (!payment) return null;

    const updatedPayments = payments.map(p => {
      if (p.id === paymentId) {
        return { ...p, status: 'Successful', canVerify: false, canRefund: true };
      }
      return p;
    });
    setItem(STORAGE_KEYS.PAYMENTS, updatedPayments);

    // Sync transaction
    const updatedTransactions = transactions.map(t => {
      if (t.orderId === payment.orderId) {
        return { ...t, status: 'Successful' };
      }
      return t;
    });
    setItem(STORAGE_KEYS.TRANSACTIONS, updatedTransactions);

    // Sync order
    const updatedOrders = orders.map(o => {
      if (o.id === payment.orderId) {
        return {
          ...o,
          paymentStatus: 'Paid',
          status: o.status === 'New' ? 'Processing' : o.status
        };
      }
      return o;
    });
    setItem(STORAGE_KEYS.ORDERS, updatedOrders);

    return { payments: updatedPayments, transactions: updatedTransactions, orders: updatedOrders };
  },

  refundPayment(paymentId, reason = 'Customer request / cold-chain return') {
    const payments = this.getPayments();
    const transactions = this.getTransactions();
    const orders = this.getOrders();

    const payment = payments.find(p => p.id === paymentId);
    if (!payment) return null;

    const updatedPayments = payments.map(p => {
      if (p.id === paymentId) {
        return { ...p, status: 'Refunded', canVerify: false, canRefund: false };
      }
      return p;
    });
    setItem(STORAGE_KEYS.PAYMENTS, updatedPayments);

    const updatedTransactions = transactions.map(t => {
      if (t.orderId === payment.orderId) {
        return { ...t, status: 'Refunded' };
      }
      return t;
    });
    setItem(STORAGE_KEYS.TRANSACTIONS, updatedTransactions);

    const updatedOrders = orders.map(o => {
      if (o.id === payment.orderId) {
        return {
          ...o,
          paymentStatus: 'Refunded',
          status: 'Cancelled',
          timeline: [
            ...(o.timeline || []),
            {
              title: 'Refund Processed',
              time: 'Today, Just now',
              note: `Full refund approved: ${reason}`
            }
          ]
        };
      }
      return o;
    });
    setItem(STORAGE_KEYS.ORDERS, updatedOrders);

    return { payments: updatedPayments, transactions: updatedTransactions, orders: updatedOrders };
  },

  // Customers
  getCustomers() {
    return getOrInit(STORAGE_KEYS.CUSTOMERS, initialCustomers);
  },

  getCustomerById(id) {
    const list = this.getCustomers();
    return list.find(c => c.id === id) || null;
  },

  saveCustomer(customerData) {
    const list = this.getCustomers();
    let updated;
    if (customerData.id && list.some(c => c.id === customerData.id)) {
      updated = list.map(c => (c.id === customerData.id ? { ...c, ...customerData } : c));
    } else {
      const newCustomer = {
        ...customerData,
        id: `cust-${Date.now()}`,
        avatar: '/assets/user-amelia.png',
        totalOrders: 0,
        totalSpent: 0,
        lastOrder: 'None',
        status: customerData.status || 'Active',
        dateJoined: 'Today'
      };
      updated = [newCustomer, ...list];
    }
    setItem(STORAGE_KEYS.CUSTOMERS, updated);
    return updated;
  },

  // Staff
  getStaff() {
    return getOrInit(STORAGE_KEYS.STAFF, initialStaff);
  },

  getStaffById(id) {
    const list = this.getStaff();
    return list.find(s => s.id === id) || null;
  },

  saveStaff(staffData) {
    const list = this.getStaff();
    let updated;
    if (staffData.id && list.some(s => s.id === staffData.id)) {
      updated = list.map(s => (s.id === staffData.id ? { ...s, ...staffData } : s));
    } else {
      const newStaff = {
        ...staffData,
        id: `staff-${Date.now()}`,
        avatar: staffData.avatar || '/assets/user-vincent.png',
        status: staffData.status || 'Invited',
        lastActive: staffData.status === 'Active' ? 'Today, Just now' : 'Invitation sent',
        createdAt: 'Today'
      };
      updated = [...list, newStaff];
    }
    setItem(STORAGE_KEYS.STAFF, updated);
    return updated;
  },

  updateStaffStatus(id, newStatus) {
    const list = this.getStaff();
    const updated = list.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status: newStatus,
          lastActive: newStatus === 'Suspended' ? 'Suspended by Admin' : s.lastActive
        };
      }
      return s;
    });
    setItem(STORAGE_KEYS.STAFF, updated);
    return updated;
  },

  // Settings
  getSettings() {
    return getOrInit(STORAGE_KEYS.SETTINGS, initialSettings);
  },

  saveSettings(newSettings) {
    setItem(STORAGE_KEYS.SETTINGS, newSettings);
    return newSettings;
  }
};
