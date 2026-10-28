import React, { createContext, useContext, useState, useCallback } from 'react';
import { storageService } from '../services/storageService';
import { rolePermissions } from '../data/mockData';

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

  // Sync state helpers
  const refreshAll = useCallback(() => {
    setProductsState(storageService.getProducts());
    setCategoriesState(storageService.getCategories());
    setInventoryState(storageService.getInventory());
    setStockMovementsState(storageService.getStockMovements());
    setOrdersState(storageService.getOrders());
    setTransactionsState(storageService.getTransactions());
    setPaymentsState(storageService.getPayments());
    setCustomersState(storageService.getCustomers());
    setStaffState(storageService.getStaff());
    setSettingsState(storageService.getSettings());
    setCurrentUserState(storageService.getCurrentUser());
  }, []);

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

  // Demo Role Switcher (for prototype testing)
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
  const saveProduct = useCallback((productData) => {
    const updated = storageService.saveProduct(productData);
    setProductsState(updated);
    setInventoryState(storageService.getInventory());
    addToast('Product successfully saved to catalog.', 'success');
    return updated;
  }, [addToast]);

  const deleteProduct = useCallback((id) => {
    const updated = storageService.deleteProduct(id);
    setProductsState(updated);
    addToast('Product removed from catalog.', 'info');
    return updated;
  }, [addToast]);

  const toggleProductStatus = useCallback((id) => {
    const updated = storageService.toggleProductStatus(id);
    setProductsState(updated);
    addToast('Product status updated.', 'success');
    return updated;
  }, [addToast]);

  // Categories actions
  const saveCategory = useCallback((categoryData) => {
    const updated = storageService.saveCategory(categoryData);
    setCategoriesState(updated);
    addToast('Category saved successfully.', 'success');
    return updated;
  }, [addToast]);

  const deleteCategory = useCallback((id) => {
    const updated = storageService.deleteCategory(id);
    setCategoriesState(updated);
    addToast('Category removed.', 'info');
    return updated;
  }, [addToast]);

  const reorderCategories = useCallback((orderedIds) => {
    const updated = storageService.reorderCategories(orderedIds);
    setCategoriesState(updated);
    addToast('Category storefront display order updated.', 'success');
    return updated;
  }, [addToast]);

  // Inventory actions
  const recordStockMovement = useCallback((movementData) => {
    const result = storageService.recordStockMovement({
      ...movementData,
      recordedBy: currentUser ? currentUser.name : 'Vincent Guizot'
    });
    setStockMovementsState(result.movements);
    setInventoryState(result.inventory);
    setProductsState(result.products);
    addToast(`Stock recorded successfully (${movementData.type})!`, 'success');
    return result;
  }, [currentUser, addToast]);

  // Orders actions
  const updateOrderStatus = useCallback((orderId, newStatus) => {
    const updated = storageService.updateOrderStatus(orderId, newStatus);
    setOrdersState(updated);
    addToast(`Order ${orderId} status updated to "${newStatus}".`, 'success');
    return updated;
  }, [addToast]);

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

  // Customers actions
  const saveCustomer = useCallback((customerData) => {
    const updated = storageService.saveCustomer(customerData);
    setCustomersState(updated);
    addToast('Customer profile created successfully.', 'success');
    return updated;
  }, [addToast]);

  // Staff actions
  const saveStaff = useCallback((staffData) => {
    const updated = storageService.saveStaff(staffData);
    setStaffState(updated);
    addToast(`Staff account for ${staffData.name} saved.`, 'success');
    return updated;
  }, [addToast]);

  const updateStaffStatus = useCallback((id, status) => {
    const updated = storageService.updateStaffStatus(id, status);
    setStaffState(updated);
    addToast(`Staff member status changed to "${status}".`, 'info');
    return updated;
  }, [addToast]);

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
