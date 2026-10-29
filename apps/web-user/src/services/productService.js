import apiClient from './apiClient';
import { INITIAL_PRODUCTS } from '../data/products';

/**
 * Normalizes backend product entity to consistent customer storefront shape
 */
const normalizeProduct = (prod) => ({
  id: prod.id,
  name: prod.name,
  category: prod.categoryDetail?.name || prod.category || 'Milk',
  price: Number(prod.price) || 35000,
  volume: prod.volume || '1000 ml',
  stock: prod.stock ?? 20,
  image: prod.imgUrl || prod.image || '/assets/prod-milk.png',
  storageTemp: prod.storageTemp || '2°C - 4°C',
  shelfLife: prod.expiredDate ? `${prod.expiredDate} (Batas konsumsi)` : '7 Hari',
  rating: 4.9,
  reviewsCount: 110,
  badge: (prod.categoryDetail?.name || prod.category) === 'Milk' ? 'Terlaris' : 'Panen Segar',
  isColdChain: true,
  description: prod.info || prod.description || 'Susu pasteurisasi segar dari sapi padang rumput dengan jaminan rantai dingin tanpa putus.',
  nutrition: {
    calories: '150 kkal',
    fat: '8g',
    protein: '8g',
    calcium: '300mg',
  },
  origin: 'Highland Valley Pasture, Lembang',
});

/**
 * Fetch list of all dairy products
 */
export const getProducts = async () => {
  try {
    const response = await apiClient.get('/products');
    if (response.data && Array.isArray(response.data) && response.data.length > 0) {
      return response.data.map(normalizeProduct);
    }
    return INITIAL_PRODUCTS;
  } catch (error) {
    console.warn('API /products tidak tersedia, menggunakan katalog cadangan lokal:', error.message);
    return INITIAL_PRODUCTS;
  }
};

/**
 * Fetch product detail by ID
 */
export const getProductById = async (id) => {
  try {
    const response = await apiClient.get(`/products/${id}`);
    if (response.data) {
      return normalizeProduct(response.data);
    }
  } catch (error) {
    console.warn(`Gagal memuat produk ID ${id}, mencari di katalog lokal:`, error.message);
  }
  return INITIAL_PRODUCTS.find((p) => String(p.id) === String(id)) || null;
};

// Aliases for backwards compatibility
export const fetchProducts = getProducts;
