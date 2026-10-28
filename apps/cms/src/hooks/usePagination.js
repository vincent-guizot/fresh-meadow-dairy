import { useState, useMemo } from 'react';

/**
 * Hook to manage pagination logic cleanly
 */
export function usePagination(items = [], pageSize = 10) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil((items?.length || 0) / pageSize) || 1;

  const currentItems = useMemo(() => {
    if (!items || !items.length) return [];
    const start = (currentPage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, currentPage, pageSize]);

  const goToPage = (page) => {
    const p = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(p);
  };

  return {
    currentPage,
    totalPages,
    currentItems,
    goToPage,
    setCurrentPage,
    totalItems: items?.length || 0,
    pageSize,
  };
}
