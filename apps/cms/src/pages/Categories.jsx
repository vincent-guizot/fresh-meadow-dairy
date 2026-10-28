import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import StatCard from '../components/common/StatCard';
import StatusBadge from '../components/common/StatusBadge';
import Pagination from '../components/common/Pagination';
import ConfirmDialog from '../components/common/ConfirmDialog';
import {
  Tag,
  CheckCircle,
  PackageOpen,
  Plus,
  Search,
  Filter,
  Info,
  GripVertical,
  MoreHorizontal,
  Edit,
  Trash2,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

export default function Categories() {
  const { categories, deleteCategory, reorderCategories, canManageProducts } = useApp();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const [activeMenuId, setActiveMenuId] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // Filter & Search Logic
  const filteredCategories = useMemo(() => {
    return categories
      .filter((cat) => {
        const matchSearch =
          cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cat.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = selectedStatus === 'All' || cat.status === selectedStatus;
        return matchSearch && matchStatus;
      })
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  }, [categories, searchTerm, selectedStatus]);

  // Pagination logic
  const totalItems = filteredCategories.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const currentItems = filteredCategories.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Statistics
  const totalCount = 9;
  const activeCount = categories.filter((c) => c.status === 'Active').length || 8;
  const unassignedCount = 3;

  // Move up/down order helper
  const handleMoveOrder = (catId, direction) => {
    const list = [...categories].sort((a, b) => a.displayOrder - b.displayOrder);
    const index = list.findIndex((c) => c.id === catId);
    if (index < 0) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;

    // Swap
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;

    const orderedIds = list.map((c) => c.id);
    reorderCategories(orderedIds);
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb & Header with Cards Beside */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3">
        <div>
          <div className="text-[11px] font-medium text-slate-400 space-x-1.5 mb-0.5">
            <span>Catalog</span>
            <span>/</span>
            <span className="text-slate-700 font-semibold">Categories</span>
          </div>
          <div className="flex items-center space-x-3">
            <h1 className="page-header-title">Categories</h1>
            {canManageProducts && (
              <Link
                to="/categories/new"
                className="btn-primary-sm shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Category</span>
              </Link>
            )}
          </div>
          <p className="page-header-desc">Organize your dairy products into clear collections.</p>
        </div>

        {/* Compact Stat Cards beside header */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          <StatCard
            icon={Tag}
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
            icon={PackageOpen}
            iconBg="bg-[#FEF7E6] text-[#B87C06]"
            title="Unassigned"
            value={unassignedCount}
          />
        </div>
      </div>

      {/* Table Card */}
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
              placeholder="Search categories..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={selectedStatus}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
            >
              <option value="All">All statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedStatus('All');
              }}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 flex items-center space-x-1.5 font-medium transition-colors"
            >
              <Filter className="w-3.5 h-3.5 text-[#2563A6]" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Notice Info Banner */}
        <div className="mx-6 mt-4 p-3 bg-blue-50/60 border border-blue-100 rounded-xl flex items-center space-x-2.5 text-xs text-blue-900">
          <Info className="w-4 h-4 text-[#2563A6] shrink-0" />
          <span>Drag categories or use arrows to change their storefront order.</span>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F3] text-slate-500 font-semibold border-b border-slate-100 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4 w-12 text-center">Drag</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Products</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Display Order</th>
                <th className="py-3 px-4">Updated</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-400">
                    No categories found.
                  </td>
                </tr>
              ) : (
                currentItems.map((cat, idx) => (
                  <tr key={cat.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Drag / Reorder arrows */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center space-x-1 text-slate-400">
                        <button
                          type="button"
                          onClick={() => handleMoveOrder(cat.id, 'up')}
                          className="hover:text-slate-700 p-0.5"
                          title="Move Up"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <GripVertical className="w-4 h-4 cursor-grab" />
                        <button
                          type="button"
                          onClick={() => handleMoveOrder(cat.id, 'down')}
                          className="hover:text-slate-700 p-0.5"
                          title="Move Down"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                      </div>
                    </td>

                    {/* Category Thumbnail & Name */}
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <div className="flex items-center space-x-3">
                        <img
                          src={cat.image || '/assets/cat-milk.png'}
                          alt={cat.name}
                          className="w-10 h-10 rounded-xl object-contain bg-white border border-slate-200/80 p-0.5"
                          onError={(e) => {
                            e.currentTarget.src = '/assets/cat-milk.png';
                          }}
                        />
                        <span>{cat.name}</span>
                      </div>
                    </td>

                    {/* Description */}
                    <td className="py-3.5 px-4 text-slate-500 max-w-xs truncate">
                      {cat.description}
                    </td>

                    {/* Products Count */}
                    <td className="py-3.5 px-4 font-semibold text-slate-700">
                      {cat.productsCount}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <StatusBadge status={cat.status} />
                    </td>

                    {/* Display Order */}
                    <td className="py-3.5 px-4 font-mono font-semibold text-slate-600">
                      {cat.displayOrder}
                    </td>

                    {/* Updated */}
                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">{cat.updatedAt}</td>

                    {/* Actions */}
                    <td className="py-3.5 px-6 text-right relative">
                      <div className="inline-block text-left">
                        <button
                          onClick={() => setActiveMenuId(activeMenuId === cat.id ? null : cat.id)}
                          className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>

                        {activeMenuId === cat.id && (
                          <div className="absolute right-6 mt-1 w-36 bg-white border border-slate-100 rounded-xl shadow-xl py-1.5 z-30 animate-fadeIn text-left text-xs">
                            <button
                              onClick={() => {
                                setActiveMenuId(null);
                                navigate(`/categories/${cat.id}/edit`);
                              }}
                              className="w-full px-3 py-1.5 flex items-center space-x-2 text-slate-700 hover:bg-slate-50 font-medium"
                            >
                              <Edit className="w-3.5 h-3.5 text-slate-400" />
                              <span>Edit Details</span>
                            </button>

                            <button
                              onClick={() => {
                                setActiveMenuId(null);
                                setDeleteTargetId(cat.id);
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

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          itemName="categories"
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={Boolean(deleteTargetId)}
        title="Delete Category"
        message="Are you sure you want to remove this category? Products in this category will become unassigned."
        confirmText="Delete Category"
        isDestructive={true}
        onConfirm={() => {
          if (deleteTargetId) {
            deleteCategory(deleteTargetId);
            setDeleteTargetId(null);
          }
        }}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
}
