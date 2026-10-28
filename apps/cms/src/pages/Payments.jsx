import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { formatRupiah } from '../helpers';
import StatCard from '../components/common/StatCard';
import StatusBadge from '../components/common/StatusBadge';
import Pagination from '../components/common/Pagination';
import ConfirmDialog from '../components/common/ConfirmDialog';
import {
  CreditCard,
  CheckCircle,
  Clock,
  XCircle,
  Search,
  Calendar,
  Filter,
  Info,
  MoreHorizontal,
  RotateCcw
} from 'lucide-react';

export default function Payments() {
  const { payments, verifyPayment, refundPayment, canConfigurePayments } = useApp();

  const [activeTab, setActiveTab] = useState('All Payments');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Modals
  const [refundTargetId, setRefundTargetId] = useState(null);
  const [verifyTargetId, setVerifyTargetId] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);

  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const matchSearch =
        p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.customer.toLowerCase().includes(searchTerm.toLowerCase());

      const matchMethod = selectedMethod === 'All' || p.paymentMethod.toLowerCase().includes(selectedMethod.toLowerCase());

      const matchTab =
        activeTab === 'All Payments' || p.status.toLowerCase() === activeTab.toLowerCase();

      return matchSearch && matchMethod && matchTab;
    });
  }, [payments, searchTerm, selectedMethod, activeTab]);

  const totalItems = filteredPayments.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const currentItems = filteredPayments.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="space-y-4">
      {/* Header with Cards Beside */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3">
        <div>
          <h1 className="page-header-title">Payments</h1>
          <p className="page-header-desc">
            Monitor payment status and manage payment actions.
          </p>
        </div>

        {/* Compact Stat Cards beside header */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          <StatCard
            icon={CreditCard}
            iconBg="bg-[#EBF2FB] text-[#2563A6]"
            title="Total"
            value="186"
          />
          <StatCard
            icon={CheckCircle}
            iconBg="bg-[#E9F5EE] text-[#2E945A]"
            title="Successful"
            value="172"
            trend="+12.6%"
          />
          <StatCard
            icon={Clock}
            iconBg="bg-[#FEF7E6] text-[#B87C06]"
            title="Awaiting"
            value="12"
            badgeText="Attention"
            badgeType="warning"
          />
          <StatCard
            icon={XCircle}
            iconBg="bg-[#FEECEB] text-[#D32F2F]"
            title="Failed"
            value="2"
            badgeText="Review"
            badgeType="danger"
          />
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        {/* Navigation Tabs */}
        <div className="px-6 pt-4 border-b border-slate-100 flex space-x-6 text-xs font-semibold overflow-x-auto">
          {['All Payments', 'Successful', 'Pending', 'Failed', 'Refunded'].map((tab) => (
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
              placeholder="Search payment or order ID..."
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
              <option value="Bank Transfer">Bank Transfer</option>
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

        {/* Payments Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F3] text-slate-500 font-semibold border-b border-slate-100 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-6">Payment ID</th>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-400">
                    No payments found.
                  </td>
                </tr>
              ) : (
                currentItems.map((pay) => (
                  <tr key={pay.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-6 font-mono font-semibold text-[#2563A6]">
                      {pay.id}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#2563A6]">
                      <Link to={`/orders/${encodeURIComponent(pay.orderId)}`} className="hover:underline">
                        {pay.orderId}
                      </Link>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">{pay.customer}</td>
                    <td className="py-3.5 px-4 text-slate-600">{pay.paymentMethod}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{formatRupiah(pay.amount)}</td>
                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">{pay.date}</td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={pay.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-6 text-right relative">
                      {pay.status === 'Pending' ? (
                        <button
                          onClick={() => setVerifyTargetId(pay.id)}
                          className="font-bold text-[#2563A6] hover:underline px-2 py-1 rounded hover:bg-blue-50 text-xs"
                        >
                          Verify
                        </button>
                      ) : (
                        <div className="inline-block text-left">
                          <button
                            onClick={() => setActiveMenuId(activeMenuId === pay.id ? null : pay.id)}
                            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>

                          {activeMenuId === pay.id && (
                            <div className="absolute right-6 mt-1 w-44 bg-white border border-slate-100 rounded-xl shadow-xl py-1.5 z-30 animate-fadeIn text-left text-xs">
                              <div className="px-3 py-1 text-[10px] text-slate-400 font-mono border-b border-slate-100">
                                Ref: {pay.gatewayReference}
                              </div>
                              {pay.canRefund && canConfigurePayments && (
                                <button
                                  onClick={() => {
                                    setActiveMenuId(null);
                                    setRefundTargetId(pay.id);
                                  }}
                                  className="w-full px-3 py-1.5 flex items-center space-x-2 text-red-600 hover:bg-red-50 font-medium"
                                >
                                  <RotateCcw className="w-3.5 h-3.5" />
                                  <span>Issue Refund</span>
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Info Banner at bottom matching screenshot */}
        <div className="p-3 mx-6 my-4 bg-slate-50 border border-slate-200/60 rounded-xl flex items-center space-x-2 text-xs text-slate-500">
          <Info className="w-4 h-4 text-slate-400 shrink-0" />
          <span>Gateway reference available in payment detail.</span>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          itemName="payments"
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Verify Payment Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(verifyTargetId)}
        title="Verify Payment"
        message={`Are you sure you want to manually verify payment ${verifyTargetId}? This will update the associated order to "Processing".`}
        confirmText="Confirm Verification"
        isDestructive={false}
        onConfirm={() => {
          if (verifyTargetId) {
            verifyPayment(verifyTargetId);
            setVerifyTargetId(null);
          }
        }}
        onCancel={() => setVerifyTargetId(null)}
      />

      {/* Refund Payment Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(refundTargetId)}
        title="Issue Payment Refund"
        message={`Are you sure you want to refund payment ${refundTargetId}? The associated customer order will be cancelled.`}
        confirmText="Confirm Refund"
        isDestructive={true}
        onConfirm={() => {
          if (refundTargetId) {
            refundPayment(refundTargetId);
            setRefundTargetId(null);
          }
        }}
        onCancel={() => setRefundTargetId(null)}
      />
    </div>
  );
}
