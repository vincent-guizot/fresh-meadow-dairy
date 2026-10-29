'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { getProducts } from '../services/productService';
import { useCartStore } from '../store/useCartStore';

/**
 * Custom hook to manage dairy product catalog fetching,
 * category filtering, keyword searching, and sorting.
 */
export function useProducts() {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, sortBy, setSortBy } = useCartStore();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadCatalog = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Gagal memuat katalog produk');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCatalog();
  }, [loadCatalog]);

  // Filter products by category & live search
  const filteredProducts = useMemo(() => {
    const q = (searchQuery || '').toLowerCase().trim();

    return products.filter((p) => {
      const prodCategory = (p.category || '').toLowerCase();
      const prodName = (p.name || '').toLowerCase();
      const prodDesc = (p.description || '').toLowerCase();

      // Check if item matches search query
      const matchesSearch =
        q === '' ||
        prodName.includes(q) ||
        prodCategory.includes(q) ||
        prodDesc.includes(q);

      // Category matching:
      // If user typed a search query, search broadly across the whole catalog.
      // If no search query, filter strictly by selectedCategory.
      const matchesCategory =
        q !== '' ||
        selectedCategory === 'all' ||
        prodCategory === selectedCategory.toLowerCase();

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  // Sort filtered products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === 'price-low') return list.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') return list.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') return list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    return list; // default featured
  }, [filteredProducts, sortBy]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, [setSearchQuery]);

  return {
    products,
    filteredProducts: sortedProducts,
    totalCount: sortedProducts.length,
    loading,
    error,
    reload: loadCatalog,
    sortBy,
    setSortBy,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    clearSearch,
  };
}

export default useProducts;
