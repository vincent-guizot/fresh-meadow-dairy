import axios from 'axios';
import { INITIAL_PRODUCTS } from '../data/products';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchProducts = async () => {
  try {
    const response = await apiClient.get('/products');
    if (response.data && Array.isArray(response.data) && response.data.length > 0) {
      // Map API product fields to storefront format
      return response.data.map((prod) => ({
        id: prod.id,
        name: prod.name,
        category: prod.category || 'Milk',
        price: Number(prod.price) || 35000,
        volume: prod.volume || '1000 ml',
        stock: prod.stock || 20,
        image: prod.image || '/assets/prod-milk.png',
        storageTemp: prod.storageTemp || '2°C - 4°C',
        shelfLife: prod.expiredDate ? `${prod.expiredDate} (Best before)` : '7 Days',
        rating: 4.9,
        reviewsCount: 110,
        badge: prod.category === 'Milk' ? 'Best Seller' : 'Fresh Farm',
        isColdChain: true,
        description: prod.info || 'Freshly harvested pasture-raised dairy with full cold-chain assurance.',
        nutrition: {
          calories: '150 kcal',
          fat: '8g',
          protein: '8g',
          calcium: '300mg',
        },
        origin: 'Fresh Meadow Farm Pasture',
      }));
    }
    return INITIAL_PRODUCTS;
  } catch (error) {
    console.warn('API /products unavailable, using local fresh catalog fallback:', error.message);
    return INITIAL_PRODUCTS;
  }
};

export const createOrder = async (orderPayload) => {
  try {
    const response = await apiClient.post('/orders', orderPayload);
    return response.data;
  } catch (error) {
    console.warn('Backend order endpoint not active, simulating immediate order creation.');
    // Simulated order confirmation response
    return {
      success: true,
      orderId: `FMD-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      ...orderPayload,
    };
  }
};

export default apiClient;
