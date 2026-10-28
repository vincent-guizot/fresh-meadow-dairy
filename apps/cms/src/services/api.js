import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3120";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor: automatically attach Bearer token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor: handle unauthorized errors gracefully
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Optional: clear token on session expiry if not on login page
      const currentPath = window.location.pathname;
      if (currentPath !== "/login" && currentPath !== "/register") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_info");
      }
    }
    return Promise.reject(error);
  },
);

// Normal async/await service functions

// Authentication
export const loginApi = async (credentials) => {
  const response = await apiClient.post("/users/login", credentials);
  return response.data;
};

export const registerApi = async (userData) => {
  const response = await apiClient.post("/users/register", userData);
  return response.data;
};

export const getMeApi = async () => {
  const response = await apiClient.get("/users/me");
  return response.data;
};

// Users
export const getUsersApi = async () => {
  const response = await apiClient.get("/users");
  return response.data;
};

// Products
export const getProductsApi = async () => {
  const response = await apiClient.get("/products");
  return response.data;
};

export const getProductByIdApi = async (id) => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};

export const createProductApi = async (formDataOrData) => {
  const headers =
    formDataOrData instanceof FormData
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" };

  const response = await apiClient.post("/products", formDataOrData, {
    headers,
  });
  return response.data;
};

export const updateProductApi = async (id, formDataOrData) => {
  const headers =
    formDataOrData instanceof FormData
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" };

  const response = await apiClient.put(`/products/${id}`, formDataOrData, {
    headers,
  });
  return response.data;
};

export const deleteProductApi = async (id) => {
  const response = await apiClient.delete(`/products/${id}`);
  return response.data;
};

export default apiClient;
