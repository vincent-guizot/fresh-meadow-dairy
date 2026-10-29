import axios from "axios";

const API_BASE_URL = import.meta.env?.VITE_API_URL || process.env.REACT_APP_API_URL || "http://localhost:3120";

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
    return Promise.reject(error);
  },
);

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

// Users / Staff / Customers
export const getUsersApi = async (params) => {
  const response = await apiClient.get("/users", { params });
  return response.data;
};

export const getCustomersApi = async (params) => {
  const response = await apiClient.get("/customers", { params });
  return response.data;
};

export const createCustomerApi = async (data) => {
  const response = await apiClient.post("/users", { ...data, role: "customer" });
  return response.data;
};

export const updateCustomerApi = async (id, data) => {
  const response = await apiClient.put(`/users/${id}`, data);
  return response.data;
};

export const deleteCustomerApi = async (id) => {
  const response = await apiClient.delete(`/users/${id}`);
  return response.data;
};

export const getStaffApi = async (params) => {
  const response = await apiClient.get("/staff", { params });
  return response.data;
};

export const createStaffApi = async (data) => {
  const response = await apiClient.post("/users", { ...data, role: data.role || "staff" });
  return response.data;
};

export const updateStaffApi = async (id, data) => {
  const response = await apiClient.put(`/users/${id}`, data);
  return response.data;
};

export const deleteStaffApi = async (id) => {
  const response = await apiClient.delete(`/users/${id}`);
  return response.data;
};

// Categories
export const getCategoriesApi = async () => {
  const response = await apiClient.get("/categories");
  return response.data;
};

export const getCategoryByIdApi = async (id) => {
  const response = await apiClient.get(`/categories/${id}`);
  return response.data;
};

export const createCategoryApi = async (data) => {
  const response = await apiClient.post("/categories", data);
  return response.data;
};

export const updateCategoryApi = async (id, data) => {
  const response = await apiClient.put(`/categories/${id}`, data);
  return response.data;
};

export const deleteCategoryApi = async (id) => {
  const response = await apiClient.delete(`/categories/${id}`);
  return response.data;
};

// Products
export const getProductsApi = async (params) => {
  const response = await apiClient.get("/products", { params });
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

// Orders & Status Confirmation
export const getOrdersApi = async (params) => {
  const response = await apiClient.get("/orders", { params });
  return response.data;
};

export const getOrderByIdApi = async (id) => {
  const response = await apiClient.get(`/orders/${id}`);
  return response.data;
};

export const createOrderApi = async (data) => {
  const response = await apiClient.post("/orders", data);
  return response.data;
};

export const updateOrderStatusApi = async (id, status, note) => {
  const response = await apiClient.patch(`/orders/${id}/status`, { status, note });
  return response.data;
};

export const approveOrderApi = async (id) => {
  const response = await apiClient.patch(`/orders/${id}/approve`);
  return response.data;
};

export const deleteOrderApi = async (id) => {
  const response = await apiClient.delete(`/orders/${id}`);
  return response.data;
};

// Inventory & Stock
export const getInventoryApi = async () => {
  const response = await apiClient.get("/inventory");
  return response.data;
};

export const getStockMovementsApi = async () => {
  const response = await apiClient.get("/inventory/movements");
  return response.data;
};

export const recordStockApi = async (data) => {
  const response = await apiClient.post("/inventory/record", data);
  return response.data;
};

// Overview / Analytics
export const getOverviewStatsApi = async () => {
  const response = await apiClient.get("/overview/stats");
  return response.data;
};

export default apiClient;
