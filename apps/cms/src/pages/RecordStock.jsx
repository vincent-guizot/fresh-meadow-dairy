import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useConfirmation } from '../hooks';
import ConfirmDialog from '../components/common/ConfirmDialog';
import {
  PlusCircle,
  Edit3,
  AlertTriangle,
  Info
} from 'lucide-react';

export default function RecordStock() {
  const navigate = useNavigate();
  const { products, recordStockMovement } = useApp();
  const { isOpen, config, confirm, close } = useConfirmation();

  const [movementType, setMovementType] = useState('Stock Received'); // Stock Received | Stock Adjustment
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || 'prod-1');
  const [quantity, setQuantity] = useState('48');
  const [batchNumber, setBatchNumber] = useState('FM-261028');
  const [supplier, setSupplier] = useState('Meadow Valley Dairy Co.');
  const [receivedDate, setReceivedDate] = useState('2026-10-26');
  const [expiryDate, setExpiryDate] = useState('2026-10-28');
  const [storageType, setStorageType] = useState('Chilled / Refrigerated');
  const [tempRange, setTempRange] = useState('2–6 °C');
  const [notes, setNotes] = useState('');

  // Selected product object
  const currentProduct = useMemo(() => {
    return products.find((p) => p.id === selectedProductId) || products[0];
  }, [products, selectedProductId]);

  // Projected stock calculation
  const currentStock = currentProduct ? currentProduct.stock : 0;
  const numQuantity = parseInt(quantity, 10) || 0;
  const projectedStock =
    movementType === 'Stock Received'
      ? currentStock + numQuantity
      : numQuantity;

  // Days until expiry
  const daysUntilExpiry = useMemo(() => {
    if (!expiryDate) return null;
    const exp = new Date(expiryDate);
    const today = new Date('2026-10-26'); // Reference date
    const diffTime = exp - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }, [expiryDate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!numQuantity || numQuantity <= 0) return;

    confirm({
      title: 'Konfirmasi Pencatatan Stok',
      message: `Apakah Anda yakin ingin menyimpan ${movementType} sebanyak ${numQuantity} unit untuk "${currentProduct.name}" (Batch: ${batchNumber})? Estimasi stok akhir: ${projectedStock} unit.`,
      confirmText: 'Ya, Simpan Stok',
      iconType: 'create',
      onConfirm: () => {
        recordStockMovement({
          productId: currentProduct.id,
          productName: currentProduct.name,
          sku: currentProduct.sku,
          type: movementType,
          quantity: numQuantity,
          batchNumber,
          supplier,
          receivedDate,
          expiryDate,
          storageType,
          tempRange,
          notes
        });

        navigate('/inventory');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="page-header-title">Record Stock</h1>
          <p className="page-header-desc">
            Add incoming stock or adjust an existing product batch.
          </p>
        </div>
        <div className="flex items-center space-x-3 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => navigate('/inventory')}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
          >
            Record Stock
          </button>
        </div>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Column (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Stock Movement Type Selector */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-3">
            <h3 className="text-sm font-bold text-[#17324D]">Stock Movement</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option 1: Stock Received */}
              <label
                onClick={() => setMovementType('Stock Received')}
                className={`p-4 rounded-2xl border-2 flex items-center space-x-3.5 cursor-pointer transition-all ${
                  movementType === 'Stock Received'
                    ? 'border-[#2563A6] bg-blue-50/40'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    movementType === 'Stock Received'
                      ? 'bg-[#2563A6] text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <PlusCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-xs block">Stock Received</span>
                  <span className="text-[11px] text-slate-500 block">Add new units to inventory.</span>
                </div>
              </label>

              {/* Option 2: Stock Adjustment */}
              <label
                onClick={() => setMovementType('Stock Adjustment')}
                className={`p-4 rounded-2xl border-2 flex items-center space-x-3.5 cursor-pointer transition-all ${
                  movementType === 'Stock Adjustment'
                    ? 'border-[#2563A6] bg-blue-50/40'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    movementType === 'Stock Adjustment'
                      ? 'bg-[#2563A6] text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-xs block">Stock Adjustment</span>
                  <span className="text-[11px] text-slate-500 block">Correct an existing quantity.</span>
                </div>
              </label>
            </div>
          </div>

          {/* Product & Quantity */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
            <h3 className="text-sm font-bold text-[#17324D]">Product & Quantity</h3>

            {/* Product Select */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Product <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.sku})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Quantity */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Quantity {movementType === 'Stock Received' ? 'received' : 'to set'} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                    min="1"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                    units
                  </span>
                </div>
              </div>

              {/* Batch Number */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Batch number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={batchNumber}
                  onChange={(e) => setBatchNumber(e.target.value)}
                  placeholder="FM-261028"
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Supplier */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Supplier <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={supplier}
                  onChange={(e) => setSupplier(e.target.value)}
                  placeholder="Meadow Valley Dairy Co."
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
                />
              </div>

              {/* Received Date */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Received date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={receivedDate}
                  onChange={(e) => setReceivedDate(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
                />
              </div>
            </div>
          </div>

          {/* Batch & Storage Details */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
            <h3 className="text-sm font-bold text-[#17324D]">Batch & Storage Details</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Expiration date */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Expiration date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
                />
              </div>

              {/* Storage type */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Storage type <span className="text-red-500">*</span>
                </label>
                <select
                  value={storageType}
                  onChange={(e) => setStorageType(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
                >
                  <option value="Chilled / Refrigerated">Chilled / Refrigerated</option>
                  <option value="Frozen">Frozen (-18°C)</option>
                  <option value="Room Temperature">Room Temperature</option>
                </select>
              </div>
            </div>

            {/* Temperature range */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Temperature range <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={tempRange}
                onChange={(e) => setTempRange(e.target.value)}
                placeholder="2–6 °C"
                required
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Notes (optional)
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add receiving notes..."
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6] resize-none"
              />
            </div>
          </div>

        </div>

        {/* Right Column (1 Col): Inventory Preview Card */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
            <h3 className="text-sm font-bold text-[#17324D]">Inventory Preview</h3>

            {/* Product summary */}
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
              <img
                src={currentProduct?.coverImage || '/assets/prod-milk.png'}
                alt={currentProduct?.name}
                className="w-14 h-14 rounded-xl object-contain bg-white border border-slate-200 p-1"
                onError={(e) => {
                  e.currentTarget.src = '/assets/prod-milk.png';
                }}
              />
              <div>
                <h4 className="font-bold text-slate-900 text-xs">{currentProduct?.name}</h4>
                <span className="text-[11px] text-slate-400 font-mono block">SKU: {currentProduct?.sku}</span>
              </div>
            </div>

            {/* Numbers calculation */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center text-slate-600">
                <span>Current stock</span>
                <span className="font-bold text-slate-800">{currentStock} units</span>
              </div>

              <div className="flex justify-between items-center text-slate-600">
                <span>Incoming quantity</span>
                <span className="font-bold text-emerald-600">+{numQuantity} units</span>
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-between items-center text-sm">
                <span className="font-bold text-slate-900">Projected stock</span>
                <span className="font-extrabold text-[#2563A6] text-base">{projectedStock} units</span>
              </div>
            </div>

            {/* Expiry Alert Widget */}
            {daysUntilExpiry !== null && (
              <div className="p-3 bg-[#FEF7E6] border border-[#FCE6B7] rounded-xl flex items-start space-x-2.5 text-xs text-[#B87C06]">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">{daysUntilExpiry} days until expiry</span>
                  <span className="text-[11px] block">Expires on {expiryDate}.</span>
                </div>
              </div>
            )}

            {/* Temperature Cold Chain Info */}
            <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl flex items-start space-x-2.5 text-xs text-[#2563A6]">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <span>Chilled dairy products should remain at {tempRange}.</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Save Bar */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200/80">
        <button
          type="submit"
          className="px-6 py-2.5 bg-[#2563A6] hover:bg-[#1C4E86] text-white text-xs font-semibold rounded-xl shadow-md shadow-blue-600/20 transition-all"
        >
          Save Stock Record
        </button>
        <button
          type="button"
          onClick={() => navigate('/inventory')}
          className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-50 transition-colors"
        >
          Cancel
        </button>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog isOpen={isOpen} onCancel={close} {...config} />
    </form>
  );
}
