import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import StatCard from '../components/common/StatCard';
import StatusBadge from '../components/common/StatusBadge';
import Pagination from '../components/common/Pagination';
import {
  Users,
  UserPlus,
  RotateCcw,
  UserX,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  X,
  Phone,
  Mail,
  MapPin,
  ShoppingBag
} from 'lucide-react';

export default function Customers() {
  const { customers, orders } = useApp();

  const [activeTab, setActiveTab] = useState('All Customers');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const formatRupiah = (val) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(val).replace('IDR', 'Rp');
  };

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.toLowerCase().includes(searchTerm.toLowerCase());

      const matchTab =
        activeTab === 'All Customers' || c.status.toLowerCase() === activeTab.toLowerCase();

      return matchSearch && matchTab;
    });
  }, [customers, searchTerm, activeTab]);

  const totalItems = filteredCustomers.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const currentItems = filteredCustomers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Customer's orders
  const customerOrders = useMemo(() => {
    if (!selectedCustomer) return [];
    return orders.filter(
      (o) =>
        o.customer.toLowerCase() === selectedCustomer.name.toLowerCase() ||
        o.customerEmail?.toLowerCase() === selectedCustomer.email.toLowerCase()
    );
  }, [orders, selectedCustomer]);

  return (
    <div className="space-y-4">
      {/* Header with Add Button Right Next to Title & Cards Beside Header */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="page-header-title">Customers</h1>
            <Link
              to="/customers/new"
              className="btn-primary-sm shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Customer</span>
            </Link>
          </div>
          <p className="page-header-desc">
            View customer profiles and their order activity.
          </p>
        </div>

        {/* Compact Stat Cards beside header */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          <StatCard
            icon={Users}
            iconBg="bg-[#EBF2FB] text-[#2563A6]"
            title="Total"
            value="1,284"
            trend="+8.4%"
          />
          <StatCard
            icon={UserPlus}
            iconBg="bg-[#E9F5EE] text-[#2E945A]"
            title="New"
            value="86"
            trend="+12.1%"
          />
          <StatCard
            icon={RotateCcw}
            iconBg="bg-[#FEF7E6] text-[#B87C06]"
            title="Returning"
            value="72%"
          />
          <StatCard
            icon={UserX}
            iconBg="bg-[#FEECEB] text-[#D32F2F]"
            title="Inactive"
            value="34"
          />
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        {/* Navigation Tabs */}
        <div className="px-6 pt-4 border-b border-slate-100 flex space-x-6 text-xs font-semibold">
          {['All Customers', 'Active', 'New', 'Inactive'].map((tab) => (
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

        {/* Toolbar */}
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
              placeholder="Search name, email, or phone..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]">
              <option value="All">Date joined</option>
              <option value="This Month">This Month</option>
              <option value="This Year">This Year</option>
            </select>

            <select className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]">
              <option value="All">Order activity</option>
              <option value="Frequent">Frequent (5+ orders)</option>
              <option value="First-time">First-time</option>
            </select>

            <button
              onClick={() => setSearchTerm('')}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 flex items-center space-x-1.5 font-medium transition-colors"
            >
              <Filter className="w-3.5 h-3.5 text-[#2563A6]" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Customer Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F3] text-slate-500 font-semibold border-b border-slate-100 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-6">Customer</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Total Orders</th>
                <th className="py-3 px-4">Total Spent</th>
                <th className="py-3 px-4">Last Order</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-400">
                    No customers found.
                  </td>
                </tr>
              ) : (
                currentItems.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => setSelectedCustomer(c)}
                    className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 px-6 font-bold text-slate-900">
                      <div className="flex items-center space-x-3">
                        <img
                          src={c.avatar || '/assets/user-amelia.png'}
                          alt={c.name}
                          className="w-9 h-9 rounded-full object-cover border border-slate-200"
                          onError={(e) => {
                            e.currentTarget.src = '/assets/user-amelia.png';
                          }}
                        />
                        <span>{c.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">{c.email}</td>
                    <td className="py-3.5 px-4 text-slate-600">{c.phone}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">{c.totalOrders}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{formatRupiah(c.totalSpent)}</td>
                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">{c.lastOrder}</td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={c.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setSelectedCustomer(c)}
                        className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
                        title="View Customer Profile"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
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
          itemName="customers"
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-3.5">
                <img
                  src={selectedCustomer.avatar || '/assets/user-amelia.png'}
                  alt={selectedCustomer.name}
                  className="w-12 h-12 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h3 className="text-base font-extrabold text-[#17324D]">{selectedCustomer.name}</h3>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <StatusBadge status={selectedCustomer.status} size="sm" />
                    <span className="text-[11px] text-slate-400">Joined {selectedCustomer.dateJoined}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 space-y-5 text-xs">
              {/* Contact info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center space-x-2.5">
                  <Mail className="w-4 h-4 text-[#2563A6]" />
                  <span className="text-slate-700">{selectedCustomer.email}</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Phone className="w-4 h-4 text-[#2563A6]" />
                  <span className="text-slate-700">{selectedCustomer.phone}</span>
                </div>
              </div>

              {/* Shipping address */}
              {selectedCustomer.shippingAddress && (
                <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#EBE5D8]">
                  <div className="flex items-center space-x-2 font-bold text-slate-800 mb-1.5">
                    <MapPin className="w-4 h-4 text-[#2563A6]" />
                    <span>Default Delivery Address ({selectedCustomer.shippingAddress.label})</span>
                  </div>
                  <span className="text-slate-700 block">{selectedCustomer.shippingAddress.address}</span>
                  <span className="text-slate-600 block">
                    {selectedCustomer.shippingAddress.city}, {selectedCustomer.shippingAddress.province} {selectedCustomer.shippingAddress.postalCode}
                  </span>
                  {selectedCustomer.shippingAddress.deliveryNotes && (
                    <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md inline-block mt-2 font-medium">
                      Note: {selectedCustomer.shippingAddress.deliveryNotes}
                    </span>
                  )}
                </div>
              )}

              {/* Spending Summary */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-2xl bg-blue-50/50 border border-blue-100 text-center">
                  <span className="text-slate-500 block text-[11px]">Total Purchases</span>
                  <span className="text-base font-bold text-[#17324D]">{selectedCustomer.totalOrders} Orders</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 text-center">
                  <span className="text-slate-500 block text-[11px]">Total Spent</span>
                  <span className="text-base font-bold text-[#227244]">{formatRupiah(selectedCustomer.totalSpent)}</span>
                </div>
              </div>

              {/* Order history */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-800 text-sm">Order History</span>
                  <ShoppingBag className="w-4 h-4 text-slate-400" />
                </div>
                {customerOrders.length === 0 ? (
                  <p className="text-slate-400 py-3 text-center border rounded-xl">No past orders found.</p>
                ) : (
                  <div className="space-y-2">
                    {customerOrders.map((ord) => (
                      <div
                        key={ord.id}
                        className="p-3 rounded-xl border border-slate-100 flex items-center justify-between hover:bg-slate-50 transition-colors"
                      >
                        <div>
                          <span className="font-bold text-[#2563A6] block">{ord.id}</span>
                          <span className="text-slate-500 text-[11px] block">{ord.itemsSummary}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-slate-800 block">{formatRupiah(ord.total)}</span>
                          <StatusBadge status={ord.status} size="sm" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedCustomer(null)}
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
