import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3120';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 6000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to inject Authorization header if customer token exists
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      try {
        const storedAuth = window.localStorage.getItem('fresh-meadow-customer-auth');
        if (storedAuth) {
          const parsed = JSON.parse(storedAuth);
          const token = parsed?.state?.token;
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
      } catch (err) {
        // Silently continue if parse fails
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for unified error formatting
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMsg =
      error.response?.data?.msg ||
      error.response?.data?.message ||
      error.message ||
      'Terjadi kendala pada jaringan server';
    return Promise.reject(new Error(errorMsg));
  }
);

export default apiClient;
