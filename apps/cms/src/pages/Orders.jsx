import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { formatRupiah } from '../helpers';
import StatCard from '../components/common/StatCard';
import StatusBadge from '../components/common/StatusBadge';
import Pagination from '../components/common/Pagination';
import ConfirmDialog from '../components/common/ConfirmDialog';
import {
  ShoppingCart,
  Package,
  Truck,
  CheckCircle,
  Search,
  Calendar,
  Filter,
  MoreHorizontal,
  X,
  MapPin,
  User
} from 'lucide-react';

export default function Orders() {
  const { id: urlOrderId } = useParams();
  const navigate = useNavigate();
  const { orders, updateOrderStatus, canManageOrders } = useApp();

  const [activeTab, setActiveTab] = useState('All Orders'); // All Orders | New | Processing | Shipped | Delivered | Cancelled
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Selected Order for Modal Detail
  const [selectedOrder, setSelectedOrder] = useState(() => {
    if (urlOrderId) {
      const decoded = decodeURIComponent(urlOrderId);
      return orders.find((o) => o.id === decoded) || null;
    }
    return null;
  });

  // Action status change confirmation
  const [pendingStatusChange, setPendingStatusChange] = useState(null);

  // Filter logic
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch =
        o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.itemsSummary.toLowerCase().includes(searchTerm.toLowerCase());

      const matchPayment =
        selectedPaymentStatus === 'All' || o.paymentStatus.toLowerCase() === selectedPaymentStatus.toLowerCase();

      const matchTab =
        activeTab === 'All Orders' || o.status.toLowerCase() === activeTab.toLowerCase();

      return matchSearch && matchPayment && matchTab;
    });
  }, [orders, searchTerm, selectedPaymentStatus, activeTab]);

  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const currentItems = filteredOrders.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Stats
  const totalCount = 186;
  const awaitingFulfillmentCount = orders.filter((o) => o.status === 'Processing' || o.status === 'New').length || 24;
  const inDeliveryCount = orders.filter((o) => o.status === 'Shipped').length || 38;
  const completedCount = orders.filter((o) => o.status === 'Delivered').length || 112;

  const handleOpenDetail = (order) => {
    setSelectedOrder(order);
    navigate(`/orders/${encodeURIComponent(order.id)}`, { replace: true });
  };

  const handleCloseDetail = () => {
    setSelectedOrder(null);
    navigate('/orders', { replace: true });
  };

  const handleExecuteStatusChange = () => {
    if (pendingStatusChange && selectedOrder) {
      updateOrderStatus(selectedOrder.id, pendingStatusChange);
      setSelectedOrder((prev) => (prev ? { ...prev, status: pendingStatusChange } : null));
      setPendingStatusChange(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header with Cards Beside */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3">
        <div>
          <h1 className="page-header-title">Orders</h1>
          <p className="page-header-desc">Manage and track your customer orders.</p>
        </div>

        {/* Compact Stat Cards beside header */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          <StatCard
            icon={ShoppingCart}
            iconBg="bg-[#E9F5EE] text-[#2E945A]"
            title="Total"
            value={totalCount}
            trend="+8.2%"
          />
          <StatCard
            icon={Package}
            iconBg="bg-[#FEF7E6] text-[#B87C06]"
            title="Awaiting"
            value={awaitingFulfillmentCount}
            badgeText="Action"
            badgeType="warning"
          />
          <StatCard
            icon={Truck}
            iconBg="bg-[#EBF2FB] text-[#2563A6]"
            title="In Delivery"
            value={inDeliveryCount}
          />
          <StatCard
            icon={CheckCircle}
            iconBg="bg-[#E9F5EE] text-[#2E945A]"
            title="Completed"
            value={completedCount}
          />
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
        {/* Navigation Tabs */}
        <div className="px-6 pt-4 border-b border-slate-100 flex space-x-6 text-xs font-semibold overflow-x-auto">
          {['All Orders', 'New', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((tab) => (
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
              placeholder="Search order ID or customer..."
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Date range picker display */}
            <div className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>26 Oct 2026 - 01 Nov 2026</span>
            </div>

            {/* Payment status */}
            <select
              value={selectedPaymentStatus}
              onChange={(e) => {
                setSelectedPaymentStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
            >
              <option value="All">All Payment Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Refunded">Refunded</option>
            </select>

            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedPaymentStatus('All');
              }}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 flex items-center space-x-1.5 font-medium transition-colors"
            >
              <Filter className="w-3.5 h-3.5 text-[#2563A6]" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F3] text-slate-500 font-semibold border-b border-slate-100 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-6">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Order Date</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-400">
                    No orders found matching the filter.
                  </td>
                </tr>
              ) : (
                currentItems.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => handleOpenDetail(order)}
                    className="hover:bg-slate-50/70 transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 px-6 font-bold text-[#2563A6]">
                      {order.id}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      {order.customer}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 max-w-xs truncate">
                      {order.itemsSummary}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                      {order.orderDate}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      {formatRupiah(order.total)}
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={order.paymentStatus} size="sm" />
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={order.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleOpenDetail(order)}
                        className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
                        title="View Order Details"
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
          itemName="orders"
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center space-x-3">
                  <h2 className="text-xl font-extrabold text-[#17324D]">{selectedOrder.id}</h2>
                  <StatusBadge status={selectedOrder.status} />
                  <StatusBadge status={selectedOrder.paymentStatus} size="sm" />
                </div>
                <span className="text-xs text-slate-400 block mt-1">Placed on {selectedOrder.orderDate}</span>
              </div>
              <button
                onClick={handleCloseDetail}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="mt-6 space-y-6 text-xs">
              {/* Customer & Address Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center space-x-2 font-bold text-slate-800 mb-2">
                    <User className="w-4 h-4 text-[#2563A6]" />
                    <span>Customer Details</span>
                  </div>
                  <span className="font-semibold text-slate-900 block">{selectedOrder.customer}</span>
                  <span className="text-slate-500 block">{selectedOrder.customerEmail}</span>
                  <span className="text-slate-500 block">{selectedOrder.customerPhone}</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center space-x-2 font-bold text-slate-800 mb-2">
                    <MapPin className="w-4 h-4 text-[#2563A6]" />
                    <span>Cold-Chain Delivery Address</span>
                  </div>
                  <span className="font-semibold text-slate-900 block">
                    {selectedOrder.shippingAddress?.recipient} ({selectedOrder.shippingAddress?.label})
                  </span>
                  <span className="text-slate-500 block">{selectedOrder.shippingAddress?.address}</span>
                  <span className="text-slate-500 block">
                    {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.province} {selectedOrder.shippingAddress?.postalCode}
                  </span>
                  {selectedOrder.shippingAddress?.notes && (
                    <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md inline-block mt-1 font-medium">
                      Note: {selectedOrder.shippingAddress?.notes}
                    </span>
                  )}
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-bold text-slate-800 mb-3 text-sm">Ordered Items</h3>
                <div className="border border-slate-100 rounded-2xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF8F3] text-slate-500 font-semibold border-b border-slate-100">
                      <tr>
                        <th className="py-2.5 px-4">Item</th>
                        <th className="py-2.5 px-4 text-center">Qty</th>
                        <th className="py-2.5 px-4 text-right">Unit Price</th>
                        <th className="py-2.5 px-4 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {selectedOrder.items?.map((item, idx) => (
                        <tr key={idx}>
                          <td className="py-2.5 px-4 font-semibold text-slate-800">{item.name}</td>
                          <td className="py-2.5 px-4 text-center">{item.quantity}</td>
                          <td className="py-2.5 px-4 text-right text-slate-600">{formatRupiah(item.price)}</td>
                          <td className="py-2.5 px-4 text-right font-bold text-slate-800">{formatRupiah(item.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-[#FAF8F3]/50 border-t border-slate-100 font-semibold">
                      <tr>
                        <td colSpan="3" className="py-2 px-4 text-right text-slate-500">Subtotal</td>
                        <td className="py-2 px-4 text-right">{formatRupiah(selectedOrder.subtotal || selectedOrder.total)}</td>
                      </tr>
                      <tr>
                        <td colSpan="3" className="py-2 px-4 text-right text-slate-500">Cold-Chain Insulated Shipping</td>
                        <td className="py-2 px-4 text-right">{formatRupiah(selectedOrder.shippingFee || 0)}</td>
                      </tr>
                      <tr className="border-t border-slate-200 text-sm font-bold text-[#17324D]">
                        <td colSpan="3" className="py-2.5 px-4 text-right">Total Paid / Due</td>
                        <td className="py-2.5 px-4 text-right text-[#2563A6]">{formatRupiah(selectedOrder.total)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Status Update Actions */}
              {canManageOrders && (
                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                  <span className="font-bold text-[#17324D] block mb-2">Update Order Status</span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setPendingStatusChange('Processing')}
                      disabled={selectedOrder.status === 'Processing'}
                      className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold disabled:opacity-40"
                    >
                      Mark as Processing
                    </button>
                    <button
                      type="button"
                      onClick={() => setPendingStatusChange('Shipped')}
                      disabled={selectedOrder.status === 'Shipped'}
                      className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold disabled:opacity-40"
                    >
                      Dispatch / Shipped
                    </button>
                    <button
                      type="button"
                      onClick={() => setPendingStatusChange('Delivered')}
                      disabled={selectedOrder.status === 'Delivered'}
                      className="px-3 py-1.5 rounded-xl bg-[#2E945A] text-white hover:bg-[#227244] font-semibold disabled:opacity-40"
                    >
                      Mark as Delivered
                    </button>
                    <button
                      type="button"
                      onClick={() => setPendingStatusChange('Cancelled')}
                      disabled={selectedOrder.status === 'Cancelled'}
                      className="px-3 py-1.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 font-semibold disabled:opacity-40 ml-auto"
                    >
                      Cancel Order
                    </button>
                  </div>
                </div>
              )}

              {/* Order Timeline */}
              {selectedOrder.timeline && (
                <div>
                  <h3 className="font-bold text-slate-800 mb-3 text-sm">Status Timeline</h3>
                  <div className="space-y-3 pl-2 border-l-2 border-slate-200">
                    {selectedOrder.timeline.map((event, idx) => (
                      <div key={idx} className="relative pl-4">
                        <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#2563A6] ring-4 ring-white" />
                        <span className="font-bold text-slate-800 block">{event.title}</span>
                        <span className="text-[11px] text-slate-400 block">{event.time}</span>
                        {event.note && <span className="text-[11px] text-slate-600 block mt-0.5">{event.note}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={handleCloseDetail}
                className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog for Status Change */}
      <ConfirmDialog
        isOpen={Boolean(pendingStatusChange)}
        title={`Change Order Status to "${pendingStatusChange}"`}
        message={`Are you sure you want to mark order ${selectedOrder?.id} as ${pendingStatusChange}? This will update the customer timeline.`}
        confirmText="Update Status"
        isDestructive={pendingStatusChange === 'Cancelled'}
        onConfirm={handleExecuteStatusChange}
        onCancel={() => setPendingStatusChange(null)}
      />
    </div>
  );
}
