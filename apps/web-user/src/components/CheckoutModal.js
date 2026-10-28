'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog } from '@base-ui-components/react/dialog';
import { X, CheckCircle2, ShieldCheck, MapPin, Truck, QrCode, CreditCard, Banknote, Sparkles } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { createOrder } from '../services/api';

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    closeCheckout,
    items,
    clearCart,
    deliverySlot,
    getSubtotal,
    getColdPackingFee,
    getDeliveryFee,
    getGrandTotal,
  } = useCartStore();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    notes: 'Please leave in the porch insulated bag if morning delivery.',
    paymentMethod: 'qris',
  });

  const [loading, setLoading] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const grandTotal = getGrandTotal();

  const formatIDR = (val) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address) {
      alert('Please fill out all delivery details.');
      return;
    }

    setLoading(true);
    const orderPayload = {
      customer: form,
      items: items.map((i) => ({ id: i.id, name: i.name, quantity: i.quantity, price: i.price })),
      subtotal: getSubtotal(),
      coldPackingFee: getColdPackingFee(),
      deliveryFee: getDeliveryFee(),
      totalPrice: grandTotal,
      deliverySlot,
      status: 'SCHEDULED_FOR_HARVEST',
    };

    const result = await createOrder(orderPayload);
    setLoading(false);
    setCompletedOrder(result);
    clearCart();
  };

  const handleFinish = () => {
    setCompletedOrder(null);
    closeCheckout();
  };

  return (
    <Dialog.Root open={isCheckoutOpen} onOpenChange={(open) => !open && closeCheckout()}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-brand-950/60 backdrop-blur-sm z-50 animate-in fade-in" />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <Dialog.Popup className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-cream-200 overflow-hidden my-8">
            {/* Modal Header */}
            <div className="px-6 py-5 bg-cream-100 border-b border-cream-200 flex items-center justify-between">
              <div>
                <Dialog.Title className="font-serif font-bold text-xl text-brand-900">
                  {completedOrder ? 'Order Confirmed!' : 'Cold-Chain Delivery Checkout'}
                </Dialog.Title>
                <Dialog.Description className="text-xs text-gray-500">
                  {completedOrder
                    ? 'Your farm fresh dairy is scheduled for harvest dispatch.'
                    : 'Dispatched in thermal insulated boxes straight from our creamery.'}
                </Dialog.Description>
              </div>

              <Dialog.Close
                onClick={closeCheckout}
                className="w-8 h-8 rounded-full bg-white hover:bg-cream-200 text-gray-500 flex items-center justify-center border border-cream-300"
              >
                <X className="w-4 h-4" />
              </Dialog.Close>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {completedOrder ? (
                /* Success View */
                <div className="text-center py-6 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs uppercase font-bold text-brand-600 tracking-wider">
                      Dispatch ID: {completedOrder.orderId || 'FMD-729182'}
                    </span>
                    <h3 className="font-serif font-bold text-2xl text-brand-900">
                      Harvest Scheduled!
                    </h3>
                    <p className="text-xs text-gray-500 max-w-sm mx-auto">
                      Thank you, <strong>{form.name}</strong>. Your dairy will be bottled chilled and delivered on{' '}
                      <strong>{deliverySlot === 'morning' ? 'Tomorrow morning (06:00 - 08:00 AM)' : 'Tomorrow afternoon'}</strong>.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-cream-50 p-4 rounded-2xl border border-cream-200 text-left text-xs space-y-2 max-w-sm mx-auto">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Paid:</span>
                      <span className="font-bold text-brand-900">{formatIDR(completedOrder.totalPrice || grandTotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Delivery Address:</span>
                      <span className="font-medium text-brand-900 truncate max-w-[200px]">{form.address}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Cold Chain Pack:</span>
                      <span className="font-bold text-cold-700">Included (2°C - 4°C locked)</span>
                    </div>
                  </div>

                  <button
                    onClick={handleFinish}
                    className="w-full max-w-sm py-3.5 rounded-2xl bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm shadow-md transition-colors"
                  >
                    Back to Farm Store
                  </button>
                </div>
              ) : (
                /* Checkout Form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-brand-800 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-brand-600" />
                      <span>Recipient & Delivery Address</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Vincent Guizot"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full px-3.5 py-2 text-xs sm:text-sm bg-cream-50 border border-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                          WhatsApp / Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="0812-3456-7890"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full px-3.5 py-2 text-xs sm:text-sm bg-cream-50 border border-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Street Address & House / Unit # *
                      </label>
                      <textarea
                        required
                        rows={2}
                        placeholder="Jl. Meadow Pasture No. 42, Kompleks Highland, Bandung"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs sm:text-sm bg-cream-50 border border-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600 resize-none"
                      />
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="space-y-2 pt-2 border-t border-cream-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-brand-800">
                      Payment Method
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, paymentMethod: 'qris' })}
                        className={`p-2.5 rounded-xl border text-center flex flex-col items-center justify-center gap-1 transition-all ${
                          form.paymentMethod === 'qris'
                            ? 'bg-brand-50 border-brand-700 text-brand-900 font-bold shadow-xs'
                            : 'bg-white border-cream-300 text-gray-600 hover:bg-cream-100'
                        }`}
                      >
                        <QrCode className="w-5 h-5 text-brand-700" />
                        <span className="text-[11px]">QRIS / e-Wallet</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setForm({ ...form, paymentMethod: 'va' })}
                        className={`p-2.5 rounded-xl border text-center flex flex-col items-center justify-center gap-1 transition-all ${
                          form.paymentMethod === 'va'
                            ? 'bg-brand-50 border-brand-700 text-brand-900 font-bold shadow-xs'
                            : 'bg-white border-cream-300 text-gray-600 hover:bg-cream-100'
                        }`}
                      >
                        <CreditCard className="w-5 h-5 text-brand-700" />
                        <span className="text-[11px]">Virtual Account</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setForm({ ...form, paymentMethod: 'cod' })}
                        className={`p-2.5 rounded-xl border text-center flex flex-col items-center justify-center gap-1 transition-all ${
                          form.paymentMethod === 'cod'
                            ? 'bg-brand-50 border-brand-700 text-brand-900 font-bold shadow-xs'
                            : 'bg-white border-cream-300 text-gray-600 hover:bg-cream-100'
                        }`}
                      >
                        <Banknote className="w-5 h-5 text-brand-700" />
                        <span className="text-[11px]">Chilled COD</span>
                      </button>
                    </div>
                  </div>

                  {/* Summary & Submit Button */}
                  <div className="pt-4 border-t border-cream-200 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-gray-400 block font-medium">Grand Total</span>
                      <span className="font-serif font-bold text-xl text-brand-900 leading-none">
                        {formatIDR(grandTotal)}
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || items.length === 0}
                      className="px-8 py-3 rounded-2xl bg-brand-700 hover:bg-brand-800 disabled:bg-gray-300 text-white font-bold text-sm shadow-md transition-colors"
                    >
                      {loading ? 'Scheduling Harvest...' : 'Confirm Farm Order'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Dialog.Popup>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
