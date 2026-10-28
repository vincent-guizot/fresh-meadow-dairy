import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { formatRupiah } from '../helpers';
import StatCard from '../components/common/StatCard';
import StatusBadge from '../components/common/StatusBadge';
import {
  BarChart3,
  ShoppingCart,
  CreditCard,
  PackageX,
  ArrowRight,
  MoreHorizontal
} from 'lucide-react';

export default function Overview() {
  const { orders, inventory } = useApp();

  // Expiry watch items: products expiring soon (daysLeft between 0 and 14)
  const expiringItems = inventory.filter((i) => i.daysLeft > 0 && i.daysLeft <= 14).slice(0, 3);

  return (
    <div className="space-y-4">
      {/* Page Title & Compact KPI Cards beside header */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3">
        <div>
          <h1 className="page-header-title">Overview</h1>
          <p className="page-header-desc">Here's what's happening with your store today.</p>
        </div>

        {/* Compact KPI Cards beside header */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          <StatCard
            icon={BarChart3}
            iconBg="bg-[#EBF2FB] text-[#2563A6]"
            title="Total Sales"
            value="Rp 24.850.000"
            trend="+12.8%"
          />
          <StatCard
            icon={ShoppingCart}
            iconBg="bg-[#E9F5EE] text-[#2E945A]"
            title="Orders"
            value="186"
            trend="+8.2%"
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
            icon={PackageX}
            iconBg="bg-[#FEECEB] text-[#D32F2F]"
            title="Low Stock"
            value="7"
            badgeText="Restock"
            badgeType="danger"
          />
        </div>
      </div>

      {/* Middle Row: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sales Overview Chart (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-[#17324D]">Sales Overview</h2>
            <div className="flex items-center space-x-4 text-xs font-medium">
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563A6]" />
                <span className="text-slate-600">Sales (Rp)</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2E945A]" />
                <span className="text-slate-600">Orders</span>
              </div>
            </div>
          </div>

          {/* SVG Line Chart */}
          <div className="relative w-full h-56 pt-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 700 220" preserveAspectRatio="none">
              {/* Grid Lines */}
              <line x1="40" y1="20" x2="680" y2="20" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="65" x2="680" y2="65" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="110" x2="680" y2="110" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="155" x2="680" y2="155" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="40" y1="200" x2="680" y2="200" stroke="#e2e8f0" strokeWidth="1" />

              {/* Y-Axis Labels (Sales on Left, Orders on Right) */}
              <text x="35" y="24" textAnchor="end" fontSize="10" fill="#94a3b8">5.000.000</text>
              <text x="35" y="69" textAnchor="end" fontSize="10" fill="#94a3b8">4.000.000</text>
              <text x="35" y="114" textAnchor="end" fontSize="10" fill="#94a3b8">3.000.000</text>
              <text x="35" y="159" textAnchor="end" fontSize="10" fill="#94a3b8">2.000.000</text>
              <text x="35" y="204" textAnchor="end" fontSize="10" fill="#94a3b8">0</text>

              <text x="685" y="24" textAnchor="start" fontSize="10" fill="#94a3b8">100</text>
              <text x="685" y="69" textAnchor="start" fontSize="10" fill="#94a3b8">80</text>
              <text x="685" y="114" textAnchor="start" fontSize="10" fill="#94a3b8">60</text>
              <text x="685" y="159" textAnchor="start" fontSize="10" fill="#94a3b8">40</text>
              <text x="685" y="204" textAnchor="start" fontSize="10" fill="#94a3b8">20</text>

              {/* Blue Area & Line (Sales) */}
              {/* Points: Mon(80, 110), Tue(180, 75), Wed(280, 105), Thu(380, 80), Fri(480, 45), Sat(580, 85), Sun(660, 65) */}
              <defs>
                <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563A6" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#2563A6" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 80 110 L 180 75 L 280 105 L 380 80 L 480 45 L 580 85 L 660 65 L 660 200 L 80 200 Z"
                fill="url(#salesGrad)"
              />
              <path
                d="M 80 110 L 180 75 L 280 105 L 380 80 L 480 45 L 580 85 L 660 65"
                fill="none"
                stroke="#2563A6"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Sales Dots */}
              {[[80, 110], [180, 75], [280, 105], [380, 80], [480, 45], [580, 85], [660, 65]].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="4" fill="#2563A6" stroke="#ffffff" strokeWidth="2" />
              ))}

              {/* Green Line (Orders) */}
              {/* Points: Mon(80, 185), Tue(180, 175), Wed(280, 182), Thu(380, 170), Fri(480, 150), Sat(580, 170), Sun(660, 182) */}
              <path
                d="M 80 185 L 180 175 L 280 182 L 380 170 L 480 150 L 580 170 L 660 182"
                fill="none"
                stroke="#2E945A"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Order Dots */}
              {[[80, 185], [180, 175], [280, 182], [380, 170], [480, 150], [580, 170], [660, 182]].map(([cx, cy], i) => (
                <circle key={`ord-${i}`} cx={cx} cy={cy} r="4" fill="#2E945A" stroke="#ffffff" strokeWidth="2" />
              ))}
            </svg>
          </div>

          {/* X-Axis Days */}
          <div className="flex justify-between pl-8 pr-5 pt-3 text-xs text-slate-400 font-medium">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        {/* Order Status Donut Chart (1 col) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <h2 className="text-sm font-bold text-[#17324D] mb-4">Order Status</h2>

          {/* Donut graphic */}
          <div className="relative w-44 h-44 mx-auto my-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle cx="50" cy="50" r="38" stroke="#f1f5f9" strokeWidth="14" fill="none" />
              
              {/* Delivered: 42% (Light Green #48BB78) */}
              <circle
                cx="50"
                cy="50"
                r="38"
                stroke="#48BB78"
                strokeWidth="14"
                fill="none"
                strokeDasharray="100.2 238.8"
                strokeDashoffset="0"
              />
              {/* Shipped: 33% (Dark Green #227244) */}
              <circle
                cx="50"
                cy="50"
                r="38"
                stroke="#227244"
                strokeWidth="14"
                fill="none"
                strokeDasharray="78.8 238.8"
                strokeDashoffset="-100.2"
              />
              {/* Processing: 18% (Blue #2563A6) */}
              <circle
                cx="50"
                cy="50"
                r="38"
                stroke="#2563A6"
                strokeWidth="14"
                fill="none"
                strokeDasharray="43.0 238.8"
                strokeDashoffset="-179"
              />
              {/* Cancelled: 6% (Red #E53935) */}
              <circle
                cx="50"
                cy="50"
                r="38"
                stroke="#E53935"
                strokeWidth="14"
                fill="none"
                strokeDasharray="14.3 238.8"
                strokeDashoffset="-222"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-bold text-[#17324D]">186</span>
              <span className="text-[11px] text-slate-400 font-medium">Total Orders</span>
            </div>
          </div>

          {/* Status Breakdown Legend */}
          <div className="space-y-2 pt-4 border-t border-slate-100 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563A6]" />
                <span className="text-slate-600">Processing</span>
              </div>
              <div className="space-x-3 text-right">
                <span className="font-bold text-slate-800">34</span>
                <span className="text-slate-400">18%</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#227244]" />
                <span className="text-slate-600">Shipped</span>
              </div>
              <div className="space-x-3 text-right">
                <span className="font-bold text-slate-800">62</span>
                <span className="text-slate-400">33%</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#48BB78]" />
                <span className="text-slate-600">Delivered</span>
              </div>
              <div className="space-x-3 text-right">
                <span className="font-bold text-slate-800">78</span>
                <span className="text-slate-400">42%</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E53935]" />
                <span className="text-slate-600">Cancelled</span>
              </div>
              <div className="space-x-3 text-right">
                <span className="font-bold text-slate-800">12</span>
                <span className="text-slate-400">6%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Orders & Expiry Watch */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Orders (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col justify-between">
          <div className="p-6 pb-3 flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#17324D]">Recent Orders</h2>
            <Link
              to="/orders"
              className="text-xs font-semibold text-[#2563A6] hover:underline flex items-center space-x-1"
            >
              <span>View all orders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F3] text-slate-500 font-semibold border-y border-slate-100">
                <tr>
                  <th className="py-3 px-6">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Items</th>
                  <th className="py-3 px-4">Total</th>
                  <th className="py-3 px-4">Payment</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-6 font-bold text-[#2563A6]">
                      <Link to={`/orders/${encodeURIComponent(order.id)}`} className="hover:underline">
                        {order.id}
                      </Link>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">{order.customer}</td>
                    <td className="py-3.5 px-4 text-slate-500 max-w-[180px] truncate">{order.itemsSummary}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">{formatRupiah(order.total)}</td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={order.paymentStatus} size="sm" />
                    </td>
                    <td className="py-3.5 px-4">
                      <StatusBadge status={order.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <Link
                        to={`/orders/${encodeURIComponent(order.id)}`}
                        className="text-slate-400 hover:text-slate-600 inline-block p-1"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Expiry Watch (1 col) - Dairy Specific */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-[#17324D]">Expiry Watch</h2>
            <Link
              to="/inventory"
              className="text-xs font-semibold text-[#2563A6] hover:underline flex items-center space-x-1"
            >
              <span>View all products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4 my-auto">
            {expiringItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-slate-200 bg-[#FAF8F3]/60 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={item.image || '/assets/prod-milk.png'}
                    alt={item.productName}
                    className="w-10 h-10 rounded-lg object-contain bg-white border border-slate-200/80 p-0.5"
                    onError={(e) => {
                      e.currentTarget.src = '/assets/prod-milk.png';
                    }}
                  />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">{item.productName}</h4>
                    <span className="text-[11px] text-slate-400 font-mono block">
                      Batch {item.batchNumber} • {item.available} units
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] text-slate-500 font-medium block">
                    {item.expiryDate}
                  </span>
                  <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF7E6] text-[#B87C06] border border-[#FCE6B7]">
                    {item.daysLeft} days left
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Automated cold-chain monitoring</span>
            <span className="text-emerald-600 font-semibold">Active</span>
          </div>
        </div>

      </div>
    </div>
  );
}
