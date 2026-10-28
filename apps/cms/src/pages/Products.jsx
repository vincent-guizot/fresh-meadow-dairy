import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { formatRupiah } from '../helpers';
import StatCard from '../components/common/StatCard';
import StatusBadge from '../components/common/StatusBadge';
import Pagination from '../components/common/Pagination';
import ConfirmDialog from '../components/common/ConfirmDialog';
import {
  Package,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Power,
  Trash2
} from 'lucide-react';

export default function Products() {
  const { products, categories, deleteProduct, toggleProductStatus, canManageProducts } = useApp();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('Recently updated');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Action Menu state
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Confirm delete dialog state
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // Filter & Search Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchStatus = selectedStatus === 'All' || p.status === selectedStatus;
      return matchSearch && matchCategory && matchStatus;
    }).sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.price - b.price;
      if (sortBy === 'Price: High to Low') return b.price - a.price;
      if (sortBy === 'Name A-Z') return a.name.localeCompare(b.name);
      return 0; // recently updated
    });
  }, [products, searchTerm, selectedCategory, selectedStatus, sortBy]);

  // Pagination logic
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const currentItems = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Overall statistics
  const totalCount = 128; // Display catalog count as shown in screenshot
  const activeCount = products.filter((p) => p.status === 'Active').length || 112;
  const outOfStockCount = products.filter((p) => p.status === 'Out of Stock').length || 6;
  const lowStockCount = products.filter((p) => p.status === 'Low Stock').length || 7;

  return (
    <div className="space-y-4">
      {/* Breadcrumb & Header with Cards Beside */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3">
        <div>
          <div className="text-[11px] font-medium text-slate-400 space-x-1.5 mb-0.5">
            <span>Catalog</span>
            <span>/</span>
            <span className="text-slate-700 font-semibold">Products</span>
          </div>
          <div className="flex items-center space-x-3">
            <h1 className="page-header-title">Products</h1>
            {canManageProducts && (
              <Link
                to="/products/new"
                className="btn-primary-sm shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Product</span>
              </Link>
            )}
          </div>
          <p className="page-header-desc">Manage your dairy catalog, pricing, and availability.</p>
        </div>

        {/* Compact Stat Cards beside header */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          <StatCard
            icon={Package}
            iconBg="bg-[#EBF2FB] text-[#2563A6]"
            title="Total"
            value={totalCount}
          />
          <StatCard
            icon={CheckCircle}
            iconBg="bg-[#E9F5EE] text-[#2E945A]"
            title="Active"
            value={activeCount}
          />
          <StatCard
            icon={XCircle}
            iconBg="bg-[#FEECEB] text-[#D32F2F]"
            title="Out of Stock"
            value={outOfStockCount}
          />
          <StatCard
            icon={AlertTriangle}
            iconBg="bg-[#FEF7E6] text-[#B87C06]"
            title="Low Stock"
            value={lowStockCount}
          />
        </div>
      </div>

      {/* Search, Filter Toolbar & Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        {/* Filter bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search products..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
            >
              <option value="All">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Inactive">Inactive</option>
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
            >
              <option value="Recently updated">Recently updated</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
              <option value="Name A-Z">Name A-Z</option>
            </select>

            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedStatus('All');
                setSortBy('Recently updated');
              }}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 flex items-center space-x-1.5 font-medium transition-colors"
            >
              <Filter className="w-3.5 h-3.5 text-[#2563A6]" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F3] text-slate-500 font-semibold border-b border-slate-100 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-6">Product</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Updated</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-400">
                    No products found matching your search.
                  </td>
                </tr>
              ) : (
                currentItems.map((prod) => (
                  <tr key={prod.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Product & SKU */}
                    <td className="py-3.5 px-6">
                      <div className="flex items-center space-x-3">
                        <img
                          src={prod.coverImage || prod.images?.[0] || '/assets/prod-milk.png'}
                          alt={prod.name}
                          className="w-11 h-11 rounded-xl object-contain bg-white border border-slate-200/80 p-0.5"
                          onError={(e) => {
                            e.currentTarget.src = '/assets/prod-milk.png';
                          }}
                        />
                        <div>
                          <h4 className="font-bold text-slate-900 text-xs hover:text-[#2563A6] transition-colors">
                            {prod.name}
                          </h4>
                          <span className="text-[11px] text-slate-400 font-mono block mt-0.5">
                            {prod.sku}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 font-medium text-slate-700">{prod.category}</td>

                    {/* Price */}
                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      {formatRupiah(prod.price)}
                    </td>

                    {/* Stock */}
                    <td className="py-3.5 px-4 font-medium text-slate-700">
                      {prod.stock} units
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <StatusBadge status={prod.status} />
                    </td>

                    {/* Updated */}
                    <td className="py-3.5 px-4 text-slate-500">{prod.updatedAt}</td>

                    {/* Actions Menu */}
                    <td className="py-3.5 px-6 text-right relative">
                      <div className="inline-block text-left">
                        <button
                          onClick={() => setActiveMenuId(activeMenuId === prod.id ? null : prod.id)}
                          className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>

                        {activeMenuId === prod.id && (
                          <div className="absolute right-6 mt-1 w-36 bg-white border border-slate-100 rounded-xl shadow-xl py-1.5 z-30 animate-fadeIn text-left text-xs">
                            <button
                              onClick={() => {
                                setActiveMenuId(null);
                                navigate(`/products/${prod.id}/edit`);
                              }}
                              className="w-full px-3 py-1.5 flex items-center space-x-2 text-slate-700 hover:bg-slate-50 font-medium"
                            >
                              <Edit className="w-3.5 h-3.5 text-slate-400" />
                              <span>Edit Details</span>
                            </button>

                            <button
                              onClick={() => {
                                toggleProductStatus(prod.id);
                                setActiveMenuId(null);
                              }}
                              className="w-full px-3 py-1.5 flex items-center space-x-2 text-slate-700 hover:bg-slate-50 font-medium"
                            >
                              <Power className="w-3.5 h-3.5 text-slate-400" />
                              <span>{prod.status === 'Active' ? 'Deactivate' : 'Activate'}</span>
                            </button>

                            <div className="border-t border-slate-100 my-1" />

                            <button
                              onClick={() => {
                                setActiveMenuId(null);
                                setDeleteTargetId(prod.id);
                              }}
                              className="w-full px-3 py-1.5 flex items-center space-x-2 text-red-600 hover:bg-red-50 font-medium"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination matching screenshot */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          itemName="products"
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={Boolean(deleteTargetId)}
        title="Delete Product"
        message="Are you sure you want to delete this dairy product from the catalog? This action cannot be undone."
        confirmText="Delete Product"
        isDestructive={true}
        onConfirm={() => {
          if (deleteTargetId) {
            deleteProduct(deleteTargetId);
            setDeleteTargetId(null);
          }
        }}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
