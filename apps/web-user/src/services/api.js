/**
 * Backwards compatibility proxy.
 * Specialized services are refactored into:
 * - src/services/apiClient.js
 * - src/services/productService.js
 * - src/services/authService.js
 * - src/services/orderService.js
 */
export * from './index';
export { default } from './apiClient';
