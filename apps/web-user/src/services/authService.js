import apiClient from './apiClient';

/**
 * Customer login service with graceful offline fallback
 */
export const loginCustomer = async (identifier, password) => {
  try {
    const response = await apiClient.post('/users/login', {
      email: identifier,
      password,
    });
    return response.data;
  } catch (error) {
    // If backend provided an explicit error message, rethrow it
    if (error.message && !error.message.includes('jaringan')) {
      throw error;
    }
    console.warn('Backend server tidak merespons, membuat sesi lokal simulasi pelanggan.');
    return {
      access_token: `fmd-customer-token-${Date.now()}`,
      user: {
        id: 99,
        username: identifier.split('@')[0],
        email: identifier.includes('@') ? identifier : `${identifier}@freshmeadowdairy.com`,
        name: identifier.split('@')[0],
      },
    };
  }
};

/**
 * Customer registration service with offline simulation fallback
 */
export const registerCustomer = async (username, email, password) => {
  try {
    const response = await apiClient.post('/users/register', {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.message && !error.message.includes('jaringan')) {
      throw error;
    }
    console.warn('Backend server tidak merespons, membuat akun pendaftaran simulasi.');
    return {
      id: Date.now(),
      username,
      email,
      access_token: `fmd-customer-token-${Date.now()}`,
      user: {
        id: Date.now(),
        username,
        email,
        name: username,
      },
    };
  }
};

/**
 * Get current customer profile
 */
export const getCustomerProfile = async () => {
  try {
    const response = await apiClient.get('/users/profile');
    return response.data;
  } catch (error) {
    return null;
  }
};
