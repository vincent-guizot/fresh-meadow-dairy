'use client';

import React, { useState, useEffect } from 'react';
import { Dialog } from '@base-ui-components/react/dialog';
import { X, CheckCircle2, ShieldCheck, MapPin, Truck, QrCode, CreditCard, Banknote, Sparkles } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useAuthStore } from '../store/useAuthStore';
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

  const { user, addOrder } = useAuthStore();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    notes: 'Tolong gantungkan di pouch depan pagar jika pengiriman pagi.',
    paymentMethod: 'qris',
  });

  const [loading, setLoading] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || user.username || prev.name,
        phone: user.phone || prev.phone,
        address: user.address || prev.address,
      }));
    }
  }, [user]);

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
      alert('Mohon lengkapi nama penerima, WhatsApp, dan alamat pengiriman.');
      return;
    }

    setLoading(true);
    const orderPayload = {
      customer: {
        ...form,
        email: user?.email || '',
        userId: user?.id,
      },
      items: items.map((i) => ({ id: i.id, name: i.name, quantity: i.quantity, price: i.price })),
      subtotal: getSubtotal(),
      coldPackingFee: getColdPackingFee(),
      deliveryFee: getDeliveryFee(),
      totalPrice: grandTotal,
      deliverySlot,
      status: 'SCHEDULED_FOR_HARVEST',
      createdAt: new Date().toISOString(),
    };

    const result = await createOrder(orderPayload);
    const finalOrder = {
      ...orderPayload,
      orderId: result.orderId || `FMD-${Date.now().toString().slice(-6)}`,
    };

    // Save order into customer's order history
    addOrder(finalOrder);

    setLoading(false);
    setCompletedOrder(finalOrder);
    clearCart();
  };

  const handleFinish = () => {
    setCompletedOrder(null);
    closeCheckout();
  };

  return (
    <Dialog.Root open={isCheckoutOpen} onOpenChange={(open) => !open && closeCheckout()}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-fmd-navy-900/60 backdrop-blur-xs z-50 animate-in fade-in" />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <Dialog.Popup className="relative w-full max-w-xl bg-white rounded-3xl shadow-modal border border-fmd-cream-300 overflow-hidden my-8">
            {/* Modal Header */}
            <div className="px-6 py-5 bg-fmd-cream-100 border-b border-fmd-cream-300 flex items-center justify-between">
              <div>
                <Dialog.Title className="font-serif font-bold text-xl text-fmd-navy-700">
                  {completedOrder ? 'Pesanan Berhasil Dijadwalkan!' : 'Pengiriman Dingin & Checkout'}
                </Dialog.Title>
                <Dialog.Description className="text-xs text-gray-500">
                  {completedOrder
                    ? 'Susu segar Anda dijadwalkan untuk dipanen dan dikirim esok hari.'
                    : 'Diantar dalam box insulasi thermal terkunci dingin langsung dari creamery.'}
                </Dialog.Description>
              </div>

              <Dialog.Close
                onClick={closeCheckout}
                className="w-8 h-8 rounded-full bg-white hover:bg-fmd-cream-200 text-gray-500 flex items-center justify-center border border-fmd-cream-300"
              >
                <X className="w-4 h-4" />
              </Dialog.Close>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {completedOrder ? (
                /* Success View */
                <div className="text-center py-6 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-fmd-green-50 text-fmd-green-600 border border-fmd-green-200 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-1">
                    <span className="text-xs uppercase font-extrabold text-fmd-blue-600 tracking-wider">
                      Kode Pesanan: {completedOrder.orderId}
                    </span>
                    <h3 className="font-serif font-bold text-2xl text-fmd-navy-700">
                      Panen Dijadwalkan!
                    </h3>
                    <p className="text-xs text-gray-500 max-w-sm mx-auto">
                      Terima kasih, <strong>{form.name}</strong>. Pesanan Anda akan dikirim dalam kemasan dingin pada{' '}
                      <strong>{deliverySlot === 'morning' ? 'Esok Pagi (06:00 - 08:00 AM)' : 'Esok Sore'}</strong>.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="bg-fmd-cream-50 p-4 rounded-2xl border border-fmd-cream-300 text-left text-xs space-y-2 max-w-sm mx-auto">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Pembayaran:</span>
                      <span className="font-bold text-fmd-navy-700">{formatIDR(completedOrder.totalPrice || grandTotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Alamat Tujuan:</span>
                      <span className="font-medium text-fmd-navy-700 truncate max-w-[200px]">{form.address}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Insulasi Dingin:</span>
                      <span className="font-bold text-fmd-green-600">Terjamin (Suhu 2°C - 4°C)</span>
                    </div>
                  </div>

                  <button
                    onClick={handleFinish}
                    className="w-full max-w-sm py-3.5 rounded-2xl bg-fmd-blue-500 hover:bg-fmd-blue-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-fmd-blue-500/20 transition-colors"
                  >
                    Kembali ke Toko Susu
                  </button>
                </div>
              ) : (
                /* Checkout Form */
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-fmd-navy-700 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-fmd-blue-500" />
                      <span>Data Penerima & Alamat Pengiriman</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-fmd-navy-700 mb-1">
                          Nama Penerima *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Nama Lengkap"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-fmd-cream-50 border border-fmd-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-fmd-blue-500/30 focus:border-fmd-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-fmd-navy-700 mb-1">
                          No. WhatsApp / Telepon *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="0812-3456-7890"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-fmd-cream-50 border border-fmd-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-fmd-blue-500/30 focus:border-fmd-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-fmd-navy-700 mb-1">
                        Alamat Lengkap & Nomor Rumah *
                      </label>
                      <textarea
                        required
                        rows={2}
                        placeholder="Jl. Dataran Tinggi No. 42, Kompleks Highland, Bandung"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs sm:text-sm bg-fmd-cream-50 border border-fmd-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-fmd-blue-500/30 focus:border-fmd-blue-500 resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-fmd-navy-700 mb-1">
                        Catatan Pengiriman Pagi
                      </label>
                      <input
                        type="text"
                        placeholder="Contoh: Gantung di pagar depan rumah"
                        value={form.notes}
                        onChange={(e) => setForm({ ...form, notes: e.target.value })}
                        className="w-full px-3.5 py-2 text-xs bg-fmd-cream-50 border border-fmd-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-fmd-blue-500/30 focus:border-fmd-blue-500"
                      />
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="space-y-2 pt-2 border-t border-fmd-cream-200">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-fmd-navy-700">
                      Metode Pembayaran
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, paymentMethod: 'qris' })}
                        className={`p-2.5 rounded-2xl border text-center flex flex-col items-center justify-center gap-1 transition-all ${
                          form.paymentMethod === 'qris'
                            ? 'bg-fmd-blue-50 border-fmd-blue-500 text-fmd-blue-600 font-bold shadow-xs'
                            : 'bg-white border-fmd-cream-300 text-gray-600 hover:bg-fmd-cream-100'
                        }`}
                      >
                        <QrCode className="w-5 h-5 text-fmd-blue-500" />
                        <span className="text-[11px]">QRIS Instan</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setForm({ ...form, paymentMethod: 'va' })}
                        className={`p-2.5 rounded-2xl border text-center flex flex-col items-center justify-center gap-1 transition-all ${
                          form.paymentMethod === 'va'
                            ? 'bg-fmd-blue-50 border-fmd-blue-500 text-fmd-blue-600 font-bold shadow-xs'
                            : 'bg-white border-fmd-cream-300 text-gray-600 hover:bg-fmd-cream-100'
                        }`}
                      >
                        <CreditCard className="w-5 h-5 text-fmd-blue-500" />
                        <span className="text-[11px]">Virtual Account</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setForm({ ...form, paymentMethod: 'cod' })}
                        className={`p-2.5 rounded-2xl border text-center flex flex-col items-center justify-center gap-1 transition-all ${
                          form.paymentMethod === 'cod'
                            ? 'bg-fmd-blue-50 border-fmd-blue-500 text-fmd-blue-600 font-bold shadow-xs'
                            : 'bg-white border-fmd-cream-300 text-gray-600 hover:bg-fmd-cream-100'
                        }`}
                      >
                        <Banknote className="w-5 h-5 text-fmd-blue-500" />
                        <span className="text-[11px]">COD Dingin</span>
                      </button>
                    </div>
                  </div>

                  {/* Summary & Submit Button */}
                  <div className="pt-4 border-t border-fmd-cream-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 block font-medium">Total Tagihan</span>
                      <span className="font-serif font-bold text-xl text-fmd-navy-700 leading-none">
                        {formatIDR(grandTotal)}
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || items.length === 0}
                      className="px-8 py-3 rounded-2xl bg-fmd-blue-500 hover:bg-fmd-blue-600 disabled:bg-gray-300 text-white font-bold text-xs sm:text-sm shadow-md shadow-fmd-blue-500/20 transition-colors"
                    >
                      {loading ? 'Menjadwalkan...' : 'Konfirmasi Pesanan'}
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
