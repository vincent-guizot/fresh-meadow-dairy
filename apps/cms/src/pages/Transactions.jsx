import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { formatRupiah } from '../helpers';
import StatCard from '../components/common/StatCard';
import StatusBadge from '../components/common/StatusBadge';
import Pagination from '../components/common/Pagination';
import {
  BarChart3,
  ShoppingCart,
  CreditCard,
  AlertOctagon,
  Search,
  Calendar,
  Filter,
  MoreHorizontal,
  X,
  FileText
} from 'lucide-react';

export default function Transactions() {
  const { transactions } = useApp();

  const [activeTab, setActiveTab] = useState('All Transactions');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const [selectedTxn, setSelectedTxn] = useState(null);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchSearch =
        t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.customer.toLowerCase().includes(searchTerm.toLowerCase());

      const matchMethod = selectedMethod === 'All' || t.method.toLowerCase().includes(selectedMethod.toLowerCase());

      const matchTab =
        activeTab === 'All Transactions' || t.status.toLowerCase() === activeTab.toLowerCase();

      return matchSearch && matchMethod && matchTab;
    });
  }, [transactions, searchTerm, selectedMethod, activeTab]);

  const totalItems = filteredTransactions.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const currentItems = filteredTransactions.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-4">
      {/* Header with Cards Beside */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3">
        <div>
          <h1 className="page-header-title">Transactions</h1>
          <p className="page-header-desc">
            Review all payment transactions across your store.
          </p>
        </div>

        {/* Compact Stat Cards beside header */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          <StatCard
            icon={BarChart3}
            iconBg="bg-[#EBF2FB] text-[#2563A6]"
            title="Total Value"
            value="Rp 28.45M"
            trend="+10.4%"
          />
          <StatCard
            icon={ShoppingCart}
            iconBg="bg-[#E9F5EE] text-[#2E945A]"
            title="Successful"
            value="172"
            trend="+12.6%"
          />
          <StatCard
            icon={CreditCard}
            iconBg="bg-[#FEF7E6] text-[#B87C06]"
            title="Pending"
            value="12"
            badgeText="Attention"
            badgeType="warning"
          />
          <StatCard
            icon={AlertOctagon}
            iconBg="bg-[#FEECEB] text-[#D32F2F]"
            title="Failed / Ref."
            value="2"
            badgeText="Action"
            badgeType="danger"
          />
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        {/* Navigation Tabs */}
        <div className="px-6 pt-4 border-b border-slate-100 flex space-x-6 text-xs font-semibold overflow-x-auto">
          {['All Transactions', 'Successful', 'Pending', 'Failed', 'Refunded'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
              className={`pb-3 border-b-2 whitespace-nowrap transition-all ${
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
              placeholder="Search transaction or order ID..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Last 7 days</span>
            </div>

            <select
              value={selectedMethod}
              onChange={(e) => {
                setSelectedMethod(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
            >
              <option value="All">All Methods</option>
              <option value="Virtual Account">Virtual Account</option>
              <option value="E-Wallet">E-Wallet</option>
              <option value="Credit Card">Credit Card</option>
            </select>

            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedMethod('All');
              }}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 flex items-center space-x-1.5 font-medium transition-colors"
            >
              <Filter className="w-3.5 h-3.5 text-[#2563A6]" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F3] text-slate-500 font-semibold border-b border-slate-100 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-6">Transaction ID</th>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Method</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-400">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                currentItems.map((txn) => (
                  <tr
                    key={txn.id}
                    onClick={() => setSelectedTxn(txn)}
                    className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 px-6 font-mono font-semibold text-slate-700">
                      {txn.id}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#2563A6]">
                      <Link
                        to={`/orders/${encodeURIComponent(txn.orderId)}`}
                        onClick={(e) => e.stopPropagation()}
                        className="hover:underline"
                      >
                        {txn.orderId}
                      </Link>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">
                      {txn.customer}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {txn.method}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                      {txn.date}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      {formatRupiah(txn.amount)}
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={txn.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setSelectedTxn(txn)}
                        className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
                        title="View Transaction Details"
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
          itemName="transactions"
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Transaction Details Modal */}
      {selectedTxn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-100">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563A6] flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">{selectedTxn.id}</h3>
                  <span className="text-[11px] text-slate-400">Order Ref: {selectedTxn.orderId}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedTxn(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Customer</span>
                <span className="font-semibold text-slate-800">{selectedTxn.customer}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Payment Channel</span>
                <span className="font-semibold text-slate-800">{selectedTxn.channel || selectedTxn.method}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Gateway Reference</span>
                <span className="font-mono text-slate-700">{selectedTxn.reference}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Gross Amount</span>
                <span className="font-bold text-slate-800">{formatRupiah(selectedTxn.amount)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Payment Gateway Fee</span>
                <span className="text-slate-500">-{formatRupiah(selectedTxn.fee || 0)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100 text-sm font-bold text-[#17324D]">
                <span>Net Settlement</span>
                <span className="text-[#2E945A]">{formatRupiah(selectedTxn.netAmount || selectedTxn.amount)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Status</span>
                <StatusBadge status={selectedTxn.status} size="sm" />
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedTxn(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-xl text-xs hover:bg-slate-200 transition-colors"
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
