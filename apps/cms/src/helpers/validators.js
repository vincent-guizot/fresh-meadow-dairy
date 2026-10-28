/**
 * Validation utilities for forms and user inputs
 */

/**
 * Validate email address format
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

/**
 * Validate Indonesian phone number format
 */
export const isValidPhone = (phone) => {
  if (!phone || typeof phone !== 'string') return false;
  return /^(\+62|62|0)[0-9]{8,13}$/.test(phone.replace(/[\s-]/g, ''));
};

/**
 * Validate SKU format (alphanumeric and dashes, 3-20 characters)
 */
export const isValidSKU = (sku) => {
  if (!sku || typeof sku !== 'string') return false;
  return /^[A-Z0-9-]{3,20}$/i.test(sku.trim());
};

/**
 * Validate positive number
 */
export const isPositiveNumber = (val) => {
  const num = Number(val);
  return !isNaN(num) && num >= 0;
};
