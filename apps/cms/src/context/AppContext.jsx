import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { storageService } from '../services/storageService';
import { rolePermissions } from '../data/mockData';
import {
  getProductsApi,
  createProductApi,
  updateProductApi,
  deleteProductApi,
  getCategoriesApi,
  createCategoryApi,
  updateCategoryApi,
  deleteCategoryApi,
  getOrdersApi,
  updateOrderStatusApi,
  approveOrderApi,
  getCustomersApi,
  createCustomerApi,
  updateCustomerApi,
  deleteCustomerApi,
  getStaffApi,
  createStaffApi,
  updateStaffApi,
  deleteStaffApi,
  getInventoryApi,
  getStockMovementsApi,
  recordStockApi
} from '../services/api';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentUser, setCurrentUserState] = useState(() => storageService.getCurrentUser());
  const [products, setProductsState] = useState(() => storageService.getProducts());
  const [categories, setCategoriesState] = useState(() => storageService.getCategories());
  const [inventory, setInventoryState] = useState(() => storageService.getInventory());
  const [stockMovements, setStockMovementsState] = useState(() => storageService.getStockMovements());
  const [orders, setOrdersState] = useState(() => storageService.getOrders());
  const [transactions, setTransactionsState] = useState(() => storageService.getTransactions());
  const [payments, setPaymentsState] = useState(() => storageService.getPayments());
  const [customers, setCustomersState] = useState(() => storageService.getCustomers());
  const [staff, setStaffState] = useState(() => storageService.getStaff());
  const [settings, setSettingsState] = useState(() => storageService.getSettings());
  const [timeFilter, setTimeFilterState] = useState(() => storageService.getTimeFilter());
  
  // Mobile sidebar drawer state
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Global Toast System
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success', duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Fetch live database entities from backend API
  const refreshAll = useCallback(async () => {
    try {
      const [prods, cats, ords, custs, stff, inv, moves] = await Promise.allSettled([
        getProductsApi(),
        getCategoriesApi(),
        getOrdersApi(),
        getCustomersApi(),
        getStaffApi(),
        getInventoryApi(),
        getStockMovementsApi()
      ]);

      if (prods.status === 'fulfilled' && Array.isArray(prods.value) && prods.value.length > 0) {
        setProductsState(prods.value);
      }
      if (cats.status === 'fulfilled' && Array.isArray(cats.value) && cats.value.length > 0) {
        setCategoriesState(cats.value);
      }
      if (ords.status === 'fulfilled' && Array.isArray(ords.value) && ords.value.length > 0) {
        setOrdersState(ords.value);
      }
      if (custs.status === 'fulfilled' && Array.isArray(custs.value) && custs.value.length > 0) {
        setCustomersState(custs.value);
      }
      if (stff.status === 'fulfilled' && Array.isArray(stff.value) && stff.value.length > 0) {
        setStaffState(stff.value);
      }
      if (inv.status === 'fulfilled' && Array.isArray(inv.value) && inv.value.length > 0) {
        setInventoryState(inv.value);
      }
      if (moves.status === 'fulfilled' && Array.isArray(moves.value) && moves.value.length > 0) {
        setStockMovementsState(moves.value);
      }
    } catch (err) {
      console.warn('API refresh error, keeping existing state:', err.message);
    }
  }, []);

  // Initial load from Postgres API
  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  // Auth
  const login = useCallback((email, password) => {
    try {
      const user = storageService.login(email, password);
      setCurrentUserState(user);
      addToast(`Welcome back, ${user.name}!`, 'success');
      return user;
    } catch (err) {
      addToast(err.message || 'Login failed', 'error');
      throw err;
    }
  }, [addToast]);

  const logout = useCallback(() => {
    storageService.logout();
    setCurrentUserState(null);
    addToast('Signed out successfully.', 'info');
  }, [addToast]);

  // Demo Role Switcher
  const switchRole = useCallback((roleName) => {
    const defaultStaff = storageService.getStaff().find(s => s.role === roleName) || {
      id: `role-${roleName.toLowerCase()}`,
      name: `${roleName} Demo User`,
      email: `${roleName.toLowerCase().replace(/\s+/g, '')}@freshmeadow.com`,
      role: roleName,
      avatar: '/assets/user-vincent.png'
    };
    storageService.setCurrentUser(defaultStaff);
    setCurrentUserState(defaultStaff);
    addToast(`Switched active demo role to ${roleName}`, 'info');
  }, [addToast]);

  // Time filter
  const setTimeFilter = useCallback((filter) => {
    storageService.setTimeFilter(filter);
    setTimeFilterState(filter);
  }, []);

  // Products actions
  const saveProduct = useCallback(async (productData) => {
    try {
      let result;
      if (productData.id && !String(productData.id).startsWith('prod-')) {
        result = await updateProductApi(productData.id, productData);
      } else {
        result = await createProductApi(productData);
      }
      await refreshAll();
      addToast('Product successfully saved to catalog.', 'success');
      return result;
    } catch (err) {
      const updated = storageService.saveProduct(productData);
      setProductsState(updated);
      addToast('Product saved locally.', 'success');
      return updated;
    }
  }, [addToast, refreshAll]);

  const deleteProduct = useCallback(async (id) => {
    try {
      if (id && !String(id).startsWith('prod-')) {
        await deleteProductApi(id);
      }
      await refreshAll();
      addToast('Product removed from catalog.', 'info');
    } catch (err) {
      const updated = storageService.deleteProduct(id);
      setProductsState(updated);
      addToast('Product removed locally.', 'info');
    }
  }, [addToast, refreshAll]);

  const toggleProductStatus = useCallback((id) => {
    const updated = storageService.toggleProductStatus(id);
    setProductsState(updated);
    addToast('Product status updated.', 'success');
    return updated;
  }, [addToast]);

  // Categories actions
  const saveCategory = useCallback(async (categoryData) => {
    try {
      let result;
      if (categoryData.id && !String(categoryData.id).startsWith('cat-')) {
        result = await updateCategoryApi(categoryData.id, categoryData);
      } else {
        result = await createCategoryApi(categoryData);
      }
      await refreshAll();
      addToast('Category saved successfully.', 'success');
      return result;
    } catch (err) {
      const updated = storageService.saveCategory(categoryData);
      setCategoriesState(updated);
      addToast('Category saved locally.', 'success');
      return updated;
    }
  }, [addToast, refreshAll]);

  const deleteCategory = useCallback(async (id) => {
    try {
      if (id && !String(id).startsWith('cat-')) {
        await deleteCategoryApi(id);
      }
      await refreshAll();
      addToast('Category removed.', 'info');
    } catch (err) {
      const updated = storageService.deleteCategory(id);
      setCategoriesState(updated);
      addToast('Category removed locally.', 'info');
    }
  }, [addToast, refreshAll]);

  const reorderCategories = useCallback((orderedIds) => {
    const updated = storageService.reorderCategories(orderedIds);
    setCategoriesState(updated);
    addToast('Category storefront display order updated.', 'success');
    return updated;
  }, [addToast]);

  // Inventory actions
  const recordStockMovement = useCallback(async (movementData) => {
    try {
      const result = await recordStockApi({
        productId: movementData.productId,
        type: movementData.type,
        quantity: movementData.quantity,
        reason: movementData.reason,
        batchNumber: movementData.batchNumber,
        recordedBy: currentUser ? currentUser.name : 'Vincent Guizot'
      });
      await refreshAll();
      addToast(`Stock recorded successfully (${movementData.type})!`, 'success');
      return result;
    } catch (err) {
      const result = storageService.recordStockMovement({
        ...movementData,
        recordedBy: currentUser ? currentUser.name : 'Vincent Guizot'
      });
      setStockMovementsState(result.movements);
      setInventoryState(result.inventory);
      setProductsState(result.products);
      addToast(`Stock recorded locally (${movementData.type})!`, 'success');
      return result;
    }
  }, [currentUser, addToast, refreshAll]);

  // Orders actions: Update Status & Approve
  const updateOrderStatus = useCallback(async (orderId, newStatus, note) => {
    try {
      await updateOrderStatusApi(orderId, newStatus, note);
      setOrdersState((prev) =>
        prev.map((o) => (o.id === orderId || o.orderNumber === orderId ? { ...o, status: newStatus } : o))
      );
      addToast(`Status pesanan ${orderId} berhasil diubah ke "${newStatus}".`, 'success');
      await refreshAll();
    } catch (err) {
      const updated = storageService.updateOrderStatus(orderId, newStatus);
      setOrdersState(updated);
      addToast(`Status pesanan ${orderId} diubah ke "${newStatus}".`, 'success');
    }
  }, [addToast, refreshAll]);

  const approveOrder = useCallback(async (orderId) => {
    try {
      await approveOrderApi(orderId);
      setOrdersState((prev) =>
        prev.map((o) => (o.id === orderId || o.orderNumber === orderId ? { ...o, status: 'Confirmed' } : o))
      );
      addToast(`Pesanan ${orderId} berhasil disetujui oleh Admin!`, 'success');
      await refreshAll();
    } catch (err) {
      updateOrderStatus(orderId, 'Confirmed', 'Disetujui oleh admin');
    }
  }, [updateOrderStatus, addToast, refreshAll]);

  // Payments actions
  const verifyPayment = useCallback((paymentId) => {
    const result = storageService.verifyPayment(paymentId);
    if (result) {
      setPaymentsState(result.payments);
      setTransactionsState(result.transactions);
      setOrdersState(result.orders);
      addToast(`Payment ${paymentId} manually verified!`, 'success');
    }
  }, [addToast]);

  const refundPayment = useCallback((paymentId, reason) => {
    const result = storageService.refundPayment(paymentId, reason);
    if (result) {
      setPaymentsState(result.payments);
      setTransactionsState(result.transactions);
      setOrdersState(result.orders);
      addToast(`Payment ${paymentId} marked as Refunded.`, 'warning');
    }
  }, [addToast]);

  // Customers actions (saves to Users table with role='customer')
  const saveCustomer = useCallback(async (customerData) => {
    try {
      let result;
      if (customerData.id && !String(customerData.id).startsWith('cust-')) {
        result = await updateCustomerApi(customerData.id, customerData);
      } else {
        result = await createCustomerApi(customerData);
      }
      await refreshAll();
      addToast('Customer profile saved successfully to database.', 'success');
      return result;
    } catch (err) {
      const updated = storageService.saveCustomer(customerData);
      setCustomersState(updated);
      addToast('Customer profile created locally.', 'success');
      return updated;
    }
  }, [addToast, refreshAll]);

  // Staff actions (saves to Users table with role='staff' or 'admin')
  const saveStaff = useCallback(async (staffData) => {
    try {
      let result;
      if (staffData.id && !String(staffData.id).startsWith('staff-')) {
        result = await updateStaffApi(staffData.id, staffData);
      } else {
        result = await createStaffApi(staffData);
      }
      await refreshAll();
      addToast(`Staff account for ${staffData.name} saved to database.`, 'success');
      return result;
    } catch (err) {
      const updated = storageService.saveStaff(staffData);
      setStaffState(updated);
      addToast(`Staff account for ${staffData.name} saved.`, 'success');
      return updated;
    }
  }, [addToast, refreshAll]);

  const updateStaffStatus = useCallback(async (id, status) => {
    try {
      if (id && !String(id).startsWith('staff-')) {
        await updateStaffApi(id, { status: status.toLowerCase() });
      }
      await refreshAll();
      addToast(`Staff member status changed to "${status}".`, 'info');
    } catch (err) {
      const updated = storageService.updateStaffStatus(id, status);
      setStaffState(updated);
      addToast(`Staff member status changed to "${status}".`, 'info');
    }
  }, [addToast, refreshAll]);

  // Settings actions
  const saveSettings = useCallback((newSettings) => {
    const updated = storageService.saveSettings(newSettings);
    setSettingsState(updated);
    addToast('Store settings saved successfully.', 'success');
    return updated;
  }, [addToast]);

  // Permission helpers
  const userRole = currentUser?.role || 'Admin';
  const permissions = rolePermissions[userRole] || rolePermissions.Admin;

  const canManageProducts = userRole === 'Admin' || userRole === 'Product Manager';
  const canManageInventory = userRole === 'Admin' || userRole === 'Inventory Staff';
  const canManageOrders = userRole === 'Admin' || userRole === 'Order Manager';
  const canManageStaff = userRole === 'Admin';
  const canConfigurePayments = userRole === 'Admin';
  const canChangeSettings = userRole === 'Admin';

  const value = {
    currentUser,
    login,
    logout,
    switchRole,
    userRole,
    permissions,
    canManageProducts,
    canManageInventory,
    canManageOrders,
    canManageStaff,
    canConfigurePayments,
    canChangeSettings,

    timeFilter,
    setTimeFilter,

    products,
    saveProduct,
    deleteProduct,
    toggleProductStatus,

    categories,
    saveCategory,
    deleteCategory,
    reorderCategories,

    inventory,
    stockMovements,
    recordStockMovement,

    orders,
    updateOrderStatus,
    approveOrder,

    transactions,

    payments,
    verifyPayment,
    refundPayment,

    customers,
    saveCustomer,

    staff,
    saveStaff,
    updateStaffStatus,

    settings,
    saveSettings,

    isMobileSidebarOpen,
    setIsMobileSidebarOpen,

    toasts,
    addToast,
    removeToast,
    refreshAll
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
