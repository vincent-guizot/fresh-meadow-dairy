'use client';

import React from 'react';
import { Dialog } from '@base-ui-components/react/dialog';
import { X, Package, Clock, Calendar, CheckCircle2, ThermometerSnowflake, ShoppingBag } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

export default function OrderHistoryModal() {
  const { isOrderHistoryModalOpen, closeOrderHistoryModal, orders, user } = useAuthStore();

  const formatIDR = (val) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <Dialog.Root open={isOrderHistoryModalOpen} onOpenChange={(open) => !open && closeOrderHistoryModal()}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-fmd-navy-900/60 backdrop-blur-xs z-50 animate-in fade-in" />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <Dialog.Popup className="relative w-full max-w-2xl bg-white rounded-3xl shadow-modal border border-fmd-cream-300 overflow-hidden my-8 max-h-[85vh] flex flex-col">
            {/* Header */}
            <div className="px-6 py-5 bg-fmd-cream-100 border-b border-fmd-cream-300 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-fmd-blue-500 text-white flex items-center justify-center shadow-xs">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <Dialog.Title className="font-serif font-bold text-xl text-fmd-navy-700">
                    Riwayat Pesanan Saya
                  </Dialog.Title>
                  <Dialog.Description className="text-xs text-gray-500">
                    {user?.username || user?.email ? `Daftar pesanan susu untuk ${user.username || user.email}` : 'Status pemenuhan rantai dingin pesanan Anda'}
                  </Dialog.Description>
                </div>
              </div>

              <Dialog.Close
                onClick={closeOrderHistoryModal}
                className="w-8 h-8 rounded-full bg-white hover:bg-fmd-cream-200 text-gray-500 flex items-center justify-center border border-fmd-cream-300"
              >
                <X className="w-4 h-4" />
              </Dialog.Close>
            </div>

            {/* Orders List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {orders.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-fmd-cream-200 flex items-center justify-center mx-auto text-fmd-blue-500">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <h4 className="font-serif font-bold text-lg text-fmd-navy-700">
                    Belum Ada Riwayat Pesanan
                  </h4>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto">
                    Pesanan susu segar yang Anda selesaikan akan otomatis tercatat dan dapat dipantau di sini.
                  </p>
                </div>
              ) : (
                orders.map((order, index) => (
                  <div
                    key={order.orderId || index}
                    className="bg-fmd-cream-50 rounded-2xl border border-fmd-cream-300 p-5 space-y-3 shadow-xs"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-fmd-cream-200">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-fmd-navy-700">
                            #{order.orderId || `FMD-${index + 1001}`}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-fmd-green-50 text-fmd-green-600 border border-fmd-green-200 text-[10px] font-bold">
                            DIJADWALKAN PANEN
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-gray-400" />
                            <span>
                              {order.createdAt
                                ? new Date(order.createdAt).toLocaleDateString('id-ID', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                  })
                                : 'Hari Ini'}
                            </span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-gray-400" />
                            <span>
                              {order.deliverySlot === 'morning'
                                ? 'Pagi (06:00 - 08:00 AM)'
                                : 'Sore (03:00 - 05:00 PM)'}
                            </span>
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] text-gray-400 uppercase font-bold block">Total Belanja</span>
                        <span className="font-serif font-bold text-lg text-fmd-blue-500">
                          {formatIDR(order.totalPrice || order.subtotal || 0)}
                        </span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-1.5 text-xs">
                      {order.items?.map((item, i) => (
                        <div key={i} className="flex justify-between text-fmd-navy-700">
                          <span>
                            {item.quantity}x {item.name}
                          </span>
                          <span className="font-semibold">{formatIDR(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Cold Chain Note */}
                    <div className="pt-2 border-t border-fmd-cream-200 flex items-center justify-between text-[11px] text-fmd-green-600">
                      <span className="flex items-center gap-1.5">
                        <ThermometerSnowflake className="w-3.5 h-3.5" />
                        <span>Pengiriman Terinsulasi Dingin 2°C - 4°C Terjamin</span>
                      </span>
                      <span className="text-gray-400 truncate max-w-[200px]">
                        {order.customer?.address || 'Alamat Terdaftar'}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Dialog.Popup>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
