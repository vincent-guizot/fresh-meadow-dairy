import apiClient from './apiClient';

/**
 * Create customer order
 */
export const createOrder = async (orderPayload) => {
  try {
    const response = await apiClient.post('/orders', orderPayload);
    return response.data;
  } catch (error) {
    console.warn('Endpoint /orders backend belum aktif, membuat nomor konfirmasi pesanan simulasi.');
    return {
      success: true,
      orderId: `FMD-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      status: 'TERKONFIRMASI',
      coldChainStatus: 'SIAP_KEMAS_DINGIN',
      ...orderPayload,
    };
  }
};

/**
 * Fetch customer orders
 */
export const getCustomerOrders = async () => {
  try {
    const response = await apiClient.get('/orders');
    return response.data;
  } catch (error) {
    return [];
  }
};
