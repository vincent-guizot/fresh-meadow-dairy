import React from 'react';

export default function StatusBadge({ status, size = 'md' }) {
  const normalized = (status || '').toLowerCase().trim();

  let styles = 'bg-slate-100 text-slate-700 border-slate-200';
  let dotColor = 'bg-slate-400';

  // Green / Success / Active / Healthy / Delivered
  if (
    normalized === 'active' ||
    normalized === 'successful' ||
    normalized === 'paid' ||
    normalized === 'delivered' ||
    normalized === 'healthy' ||
    normalized === 'completed'
  ) {
    styles = 'bg-[#E9F5EE] text-[#227244] border-[#CDE8D8]';
    dotColor = 'bg-[#2E945A]';
  }
  // Amber / Warning / Low Stock / Pending / Processing / In Delivery / Awaiting / Needs attention
  else if (
    normalized === 'low stock' ||
    normalized === 'pending' ||
    normalized === 'processing' ||
    normalized === 'in delivery' ||
    normalized === 'awaiting payment' ||
    normalized === 'awaiting fulfillment' ||
    normalized === 'needs attention' ||
    normalized === 'invited' ||
    normalized === 'near expiry'
  ) {
    styles = 'bg-[#FEF7E6] text-[#B87C06] border-[#FCE6B7]';
    dotColor = 'bg-[#E59E0E]';
  }
  // Blue / Info / Shipped / New
  else if (
    normalized === 'shipped' ||
    normalized === 'new' ||
    normalized === 'stock received'
  ) {
    styles = 'bg-[#EBF2FB] text-[#2563A6] border-[#C8DCF4]';
    dotColor = 'bg-[#2563A6]';
  }
  // Red / Danger / Out of Stock / Failed / Cancelled / Refunded / Suspended / Expired
  else if (
    normalized === 'out of stock' ||
    normalized === 'failed' ||
    normalized === 'cancelled' ||
    normalized === 'refunded' ||
    normalized === 'suspended' ||
    normalized === 'expired' ||
    normalized === 'requires attention' ||
    normalized === 'requires restocking'
  ) {
    styles = 'bg-[#FEECEB] text-[#D32F2F] border-[#FAC8C6]';
    dotColor = 'bg-[#E53935]';
  }
  // Gray / Inactive
  else if (normalized === 'inactive') {
    styles = 'bg-slate-100 text-slate-600 border-slate-200';
    dotColor = 'bg-slate-400';
  }

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${sizeClasses} ${styles}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      <span>{status}</span>
    </span>
  );
}
