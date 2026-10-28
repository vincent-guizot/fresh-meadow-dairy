/**
 * Stock & Expiry calculation helpers for Fresh Meadow Dairy
 */

/**
 * Calculate days remaining before product expiry
 */
export const calculateDaysLeft = (expiryDateStr) => {
  if (!expiryDateStr) return 999;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(expiryDateStr);
  expiry.setHours(0, 0, 0, 0);
  const diffTime = expiry - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Determine expiry badge type, label and styles
 */
export const getExpiryBadgeInfo = (daysLeft) => {
  if (daysLeft <= 0) {
    return { label: 'Expired', badgeType: 'danger', color: 'text-red-700 bg-red-50' };
  }
  if (daysLeft <= 5) {
    return { label: `Critical: ${daysLeft}d left`, badgeType: 'danger', color: 'text-red-700 bg-red-50' };
  }
  if (daysLeft <= 14) {
    return { label: `Expiring: ${daysLeft}d left`, badgeType: 'warning', color: 'text-amber-700 bg-amber-50' };
  }
  return { label: `Fresh: ${daysLeft}d left`, badgeType: 'success', color: 'text-emerald-700 bg-emerald-50' };
};

/**
 * Determine stock level status info
 */
export const getStockStatusInfo = (stock, minStock = 10) => {
  if (stock <= 0) {
    return { status: 'Out of Stock', badgeType: 'danger', color: 'text-red-700 bg-red-50' };
  }
  if (stock <= minStock) {
    return { status: 'Low Stock', badgeType: 'warning', color: 'text-amber-700 bg-amber-50' };
  }
  return { status: 'In Stock', badgeType: 'success', color: 'text-emerald-700 bg-emerald-50' };
};
