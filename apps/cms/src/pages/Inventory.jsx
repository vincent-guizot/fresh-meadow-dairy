import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import StatCard from '../components/common/StatCard';
import StatusBadge from '../components/common/StatusBadge';
import Pagination from '../components/common/Pagination';
import {
  Archive,
  AlertTriangle,
  XCircle,
  Calendar,
  Plus,
  Search,
  Filter,
  Snowflake,
  Leaf,
  MoreHorizontal,
  ArrowDownLeft,
  ArrowUpRight
} from 'lucide-react';

export default function Inventory() {
  const { inventory, stockMovements, categories, canManageInventory } = useApp();

  const [activeTab, setActiveTab] = useState('All Stock'); // All Stock | Low Stock | Expiring Soon | Stock Movements
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Filter logic for Inventory items
  const filteredInventory = useMemo(() => {
    return inventory.filter((item) => {
      const matchSearch =
        item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.batchNumber.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCategory = selectedCategory === 'All' || true;
      const matchStatus = selectedStatus === 'All' || item.status.toLowerCase() === selectedStatus.toLowerCase();

      // Tab filtering
      if (activeTab === 'Low Stock') {
        return matchSearch && matchCategory && matchStatus && item.status.toLowerCase() === 'low stock';
      }
      if (activeTab === 'Expiring Soon') {
        return matchSearch && matchCategory && matchStatus && item.daysLeft > 0 && item.daysLeft <= 14;
      }
      return matchSearch && matchCategory && matchStatus;
    });
  }, [inventory, searchTerm, selectedCategory, selectedStatus, activeTab]);

  // Pagination for inventory items
  const totalItems = filteredInventory.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const currentItems = filteredInventory.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Stats
  const totalUnits = '2,486';
  const lowStockCount = inventory.filter((i) => i.status.toLowerCase() === 'low stock').length || 7;
  const outOfStockCount = inventory.filter((i) => i.status.toLowerCase() === 'out of stock').length || 6;
  const expiringSoonCount = inventory.filter((i) => i.daysLeft > 0 && i.daysLeft <= 14).length || 12;

  return (
    <div className="space-y-4">
      {/* Breadcrumb & Header with Cards Beside */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3">
        <div>
          <div className="text-[11px] font-medium text-slate-400 space-x-1.5 mb-0.5">
            <span>Catalog</span>
            <span>/</span>
            <span className="text-slate-700 font-semibold">Inventory</span>
          </div>
          <div className="flex items-center space-x-3">
            <h1 className="page-header-title">Inventory</h1>
            {canManageInventory && (
              <Link
                to="/inventory/record-stock"
                className="btn-primary-sm shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Record Stock</span>
              </Link>
            )}
          </div>
          <p className="page-header-desc">
            Monitor stock levels, batches, and product expiry.
          </p>
        </div>

        {/* Compact Stat Cards beside header */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          <StatCard
            icon={Archive}
            iconBg="bg-[#EBF2FB] text-[#2563A6]"
            title="Total Units"
            value={totalUnits}
          />
          <StatCard
            icon={AlertTriangle}
            iconBg="bg-[#FEF7E6] text-[#B87C06]"
            title="Low Stock"
            value={lowStockCount}
          />
          <StatCard
            icon={XCircle}
            iconBg="bg-[#FEECEB] text-[#D32F2F]"
            title="Out of Stock"
            value={outOfStockCount}
          />
          <StatCard
            icon={Calendar}
            iconBg="bg-[#FEF7E6] text-[#B87C06]"
            title="Expiring Soon"
            value={expiringSoonCount}
          />
        </div>
      </div>

      {/* Main Inventory Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        {/* Navigation Tabs */}
        <div className="px-6 pt-4 border-b border-slate-100 flex space-x-6 text-xs font-semibold">
          {['All Stock', 'Low Stock', 'Expiring Soon', 'Stock Movements'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
              className={`pb-3 border-b-2 transition-all ${
                activeTab === tab
                  ? 'border-[#2563A6] text-[#2563A6]'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Filters Toolbar */}
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
              placeholder="Search product or batch..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
            >
              <option value="All">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
            >
              <option value="All">All statuses</option>
              <option value="healthy">Healthy</option>
              <option value="low stock">Low Stock</option>
              <option value="out of stock">Out of Stock</option>
            </select>

            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedStatus('All');
              }}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 flex items-center space-x-1.5 font-medium transition-colors"
            >
              <Filter className="w-3.5 h-3.5 text-[#2563A6]" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* View 1: Stock Inventory Table */}
        {activeTab !== 'Stock Movements' ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF8F3] text-slate-500 font-semibold border-b border-slate-100 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-6">Product</th>
                    <th className="py-3 px-4">SKU / Batch</th>
                    <th className="py-3 px-4">Available</th>
                    <th className="py-3 px-4">Low Stock At</th>
                    <th className="py-3 px-4">Expiry Date</th>
                    <th className="py-3 px-4">Storage</th>
                    <th className="py-3 px-4">Last Updated</th>
                    <th className="py-3 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentItems.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="py-12 text-center text-slate-400">
                        No inventory batches found.
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                        {/* Product */}
                        <td className="py-3.5 px-6">
                          <div className="flex items-center space-x-3">
                            <img
                              src={item.image || '/assets/prod-milk.png'}
                              alt={item.productName}
                              className="w-10 h-10 rounded-xl object-contain bg-white border border-slate-200/80 p-0.5"
                              onError={(e) => {
                                e.currentTarget.src = '/assets/prod-milk.png';
                              }}
                            />
                            <div>
                              <h4 className="font-bold text-slate-900 text-xs">{item.productName}</h4>
                              <span className="text-[11px] text-slate-400">{item.productSize}</span>
                            </div>
                          </div>
                        </td>

                        {/* SKU / Batch */}
                        <td className="py-3.5 px-4 font-mono text-[11px]">
                          <span className="text-slate-800 font-semibold block">{item.sku}</span>
                          <span className="text-slate-400 block">Batch {item.batchNumber}</span>
                        </td>

                        {/* Available */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-slate-800">{item.available} units</span>
                            <StatusBadge status={item.status} size="sm" />
                          </div>
                        </td>

                        {/* Low stock threshold */}
                        <td className="py-3.5 px-4 text-slate-600 font-medium">
                          {item.lowStockAt}
                        </td>

                        {/* Expiry Date */}
                        <td className="py-3.5 px-4">
                          <span className="text-slate-700 block text-xs">{item.expiryDate}</span>
                          {item.daysLeft > 0 ? (
                            <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FEF7E6] text-[#B87C06] border border-[#FCE6B7]">
                              {item.daysLeft} days left
                            </span>
                          ) : (
                            <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#FEECEB] text-[#D32F2F] border border-[#FAC8C6]">
                              Expired
                            </span>
                          )}
                        </td>

                        {/* Storage */}
                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center gap-1.5 text-blue-600 font-medium text-xs">
                            <Snowflake className="w-3.5 h-3.5 text-blue-500" />
                            <span>{item.storageType}</span>
                          </span>
                        </td>

                        {/* Last Updated */}
                        <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                          {item.lastUpdated}
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-6 text-right">
                          <Link
                            to="/inventory/record-stock"
                            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 inline-block"
                            title="Adjust / Add Stock"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Bottom Tip Banner matching screenshot */}
            <div className="p-4 mx-6 my-4 bg-emerald-50/50 border border-emerald-100 rounded-xl flex items-center space-x-2.5 text-xs text-emerald-900">
              <Leaf className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Use batch tracking to manage dairy freshness and reduce waste.</span>
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              pageSize={pageSize}
              itemName="products"
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          /* View 2: Stock Movements History */
          <div className="overflow-x-auto p-4 sm:p-6">
            <h3 className="text-sm font-bold text-[#17324D] mb-4">Stock Movement Audit Trail</h3>
            <div className="space-y-3">
              {stockMovements.map((mov) => (
                <div
                  key={mov.id}
                  className="p-4 rounded-xl border border-slate-100 hover:border-slate-200 bg-[#FAF8F3]/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        mov.type === 'Stock Received'
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-blue-50 text-blue-600'
                      }`}
                    >
                      {mov.type === 'Stock Received' ? (
                        <ArrowDownLeft className="w-4 h-4" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-800 text-sm">{mov.productName}</span>
                        <StatusBadge status={mov.type} size="sm" />
                      </div>
                      <span className="text-slate-500 block mt-0.5">
                        Batch: <span className="font-mono font-medium text-slate-700">{mov.batchNumber}</span> • Supplier: {mov.supplier} • Temp: {mov.tempRange}
                      </span>
                      {mov.notes && (
                        <span className="text-slate-400 italic block mt-0.5">"{mov.notes}"</span>
                      )}
                    </div>
                  </div>

                  <div className="text-right sm:shrink-0">
                    <span className="text-sm font-bold text-slate-900 block">
                      {mov.type === 'Stock Received' ? `+${mov.quantity}` : mov.quantity} units
                    </span>
                    <span className="text-[11px] text-slate-400 block">{mov.timestamp} by {mov.recordedBy}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
