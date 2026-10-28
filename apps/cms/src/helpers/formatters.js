/**
 * Helper formatting utilities for Fresh Meadow Dairy CMS
 */

/**
 * Format number into Indonesian Rupiah (IDR) currency string
 * e.g. 28000 -> "Rp 28.000"
 */
export const formatRupiah = (val) => {
  if (val === null || val === undefined || isNaN(val)) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(val).replace('IDR', 'Rp');
};

/**
 * Compact currency format for badges and stat cards
 * e.g. 24850000 -> "Rp 24.85M"
 */
export const formatCompactRupiah = (val) => {
  if (!val || isNaN(val)) return 'Rp 0';
  if (val >= 1000000000) return `Rp ${(val / 1000000000).toFixed(1)}B`;
  if (val >= 1000000) return `Rp ${(val / 1000000).toFixed(2)}M`;
  if (val >= 1000) return `Rp ${(val / 1000).toFixed(0)}K`;
  return formatRupiah(val);
};

/**
 * Format ISO or standard date string into readable format (e.g. "28 Okt 2026")
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  try {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(d);
  } catch {
    return dateStr;
  }
};

/**
 * Format date time string (e.g. "28 Okt 2026, 14:30")
 */
export const formatDateTime = (dateStr) => {
  if (!dateStr) return '-';
  try {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);
  } catch {
    return dateStr;
  }
};

/**
 * Convert string to safe URL-friendly slug
 */
export const slugify = (text) => {
  return String(text || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};
