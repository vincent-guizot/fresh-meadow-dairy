'use client';

import { useCallback } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { loginCustomer, registerCustomer } from '../services/authService';

/**
 * Custom hook providing customer authentication actions and state
 */
export function useCustomerAuth() {
  const {
    user,
    token,
    isAuthenticated,
    isAuthModalOpen,
    authMode,
    isOrderHistoryModalOpen,
    orders,
    openAuthModal,
    closeAuthModal,
    setAuthMode,
    openOrderHistoryModal,
    closeOrderHistoryModal,
    setAuth,
    logout,
    addOrder,
    updateUserProfile,
  } = useAuthStore();

  const handleLogin = useCallback(
    async (identifier, password) => {
      const result = await loginCustomer(identifier, password);
      const userData = result.user || {
        id: result.id || 1,
        username: identifier.split('@')[0],
        email: identifier,
      };
      setAuth(userData, result.access_token);
      return userData;
    },
    [setAuth]
  );

  const handleRegister = useCallback(
    async (username, email, password) => {
      const result = await registerCustomer(username, email, password);
      const userData = {
        id: result.id || Date.now(),
        username: result.username || username,
        email,
      };
      setAuth(userData, result.access_token);
      return userData;
    },
    [setAuth]
  );

  return {
    user,
    token,
    isAuthenticated,
    isAuthModalOpen,
    authMode,
    isOrderHistoryModalOpen,
    orders,
    login: handleLogin,
    register: handleRegister,
    logout,
    openAuthModal,
    closeAuthModal,
    setAuthMode,
    openOrderHistoryModal,
    closeOrderHistoryModal,
    addOrder,
    updateUserProfile,
  };
}

export default useCustomerAuth;
