import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, MapPin, Clock, CreditCard, QrCode } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CheckoutModal() {
  const { isCheckoutOpen, setIsCheckoutOpen, grandTotal, clearCart } = useCart();
  const [step, setStep] = useState('form'); // form | success
  const [customerName, setCustomerName] = useState('Clara Sutanto');
  const [phone, setPhone] = useState('0812-3456-7890');
  const [address, setAddress] = useState('Jl. Surya Kencana No. 42, Menteng, Jakarta Pusat');
  const [timeSlot, setTimeSlot] = useState('06:00 – 08:00 AM (Early Morning Cold Drop)');
  const [paymentMethod, setPaymentMethod] = useState('QRIS Instant');
  const [orderId, setOrderId] = useState('');

  if (!isCheckoutOpen) return null;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const generatedId = `FMD-ORD-${Date.now().toString().slice(-6)}`;
    setOrderId(generatedId);
    setStep('success');
    clearCart();
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep('form');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div>
            <div className="flex items-center space-x-2 text-[#356B4B] text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Direct Farm-to-Door Delivery</span>
            </div>
            <h2 className="text-xl font-black text-[#17324D]">Cold-Chain Checkout</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Insulated pack with dry ice guarantees dairy freshness under 6°C.
            </p>

            <form onSubmit={handlePlaceOrder} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Recipient Name</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / Phone</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Delivery Address</label>
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Morning Delivery Slot</label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
                >
                  <option value="06:00 – 08:00 AM (Early Morning Cold Drop)">06:00 – 08:00 AM (Early Morning Cold Drop)</option>
                  <option value="08:00 – 10:00 AM (Breakfast Slot)">08:00 – 10:00 AM (Breakfast Slot)</option>
                  <option value="15:00 – 17:00 PM (Afternoon Refresh Slot)">15:00 – 17:00 PM (Afternoon Refresh Slot)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Payment Method</label>
                <div className="grid grid-cols-2 gap-2">
                  {['QRIS Instant', 'BCA Virtual Account', 'Mandiri VA', 'GoPay / OVO'].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setPaymentMethod(m)}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-left flex items-center space-x-2 ${
                        paymentMethod === m
                          ? 'border-[#2563A6] bg-blue-50/50 text-[#2563A6]'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-white'
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{m}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Total & Submit */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">Total Due</span>
                  <span className="text-lg font-black text-[#2563A6]">
                    Rp {Number(grandTotal).toLocaleString('id-ID')}
                  </span>
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#356B4B] hover:bg-[#2A573B] text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-700/20 cursor-pointer active:scale-95 transition-all"
                >
                  Confirm & Place Order
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#356B4B] flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold text-[#356B4B] uppercase tracking-wider">Order Received!</span>
              <h2 className="text-xl font-black text-[#17324D] mt-1">Thank You, {customerName}!</h2>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Your order <span className="font-mono font-bold text-[#2563A6]">{orderId}</span> has been logged to the Fresh Meadow Dairy dispatch system.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F3] border border-[#EBE5D8] text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Order ID:</span>
                <span className="font-mono font-bold text-slate-800">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Delivery Slot:</span>
                <span className="font-semibold text-slate-800">{timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Delivery To:</span>
                <span className="font-semibold text-slate-800 truncate max-w-[200px]">{address}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 font-bold">
                <span>Total Paid:</span>
                <span className="text-[#2563A6]">Rp {Number(grandTotal).toLocaleString('id-ID')}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3 bg-[#2563A6] hover:bg-[#1C4E86] text-white text-xs font-bold rounded-xl transition-all"
            >
              Back to Storefront
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
