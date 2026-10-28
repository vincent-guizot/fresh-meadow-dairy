import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PackageX, Calendar, Bell } from 'lucide-react';

export default function Settings() {
  const { settings, saveSettings, canChangeSettings } = useApp();

  const [storeName, setStoreName] = useState(settings?.storeName || 'Fresh Meadow Dairy');
  const [supportEmail, setSupportEmail] = useState(settings?.supportEmail || 'hello@freshmeadow.com');
  const [phone, setPhone] = useState(settings?.phone || '+62 21 555 0123');

  const [currency, setCurrency] = useState(settings?.currency || 'Indonesian Rupiah (IDR)');
  const [timeZone, setTimeZone] = useState(settings?.timeZone || 'Asia/Jakarta (GMT+7)');
  const [dateFormat, setDateFormat] = useState(settings?.dateFormat || 'DD MMM YYYY');

  const [lowStockAlerts, setLowStockAlerts] = useState(settings?.lowStockAlerts ?? true);
  const [expiringProductsAlerts, setExpiringProductsAlerts] = useState(settings?.expiringProductsAlerts ?? true);
  const [newOrderNotifications, setNewOrderNotifications] = useState(settings?.newOrderNotifications ?? true);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveSettings({
      storeName,
      supportEmail,
      phone,
      currency,
      timeZone,
      dateFormat,
      lowStockAlerts,
      expiringProductsAlerts,
      newOrderNotifications
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-4xl pb-12">
      {/* Header with Save Button right next to title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="page-header-title">Settings</h1>
            {canChangeSettings && (
              <button
                type="submit"
                className="btn-primary-sm shrink-0"
              >
                <span>Save Changes</span>
              </button>
            )}
          </div>
          <p className="page-header-desc">Manage your store preferences.</p>
        </div>
      </div>

      {/* Card 1: Store Information */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
        <h3 className="text-sm font-bold text-[#17324D]">Store Information</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Store Name
            </label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Support Email
            </label>
            <input
              type="email"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Phone
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
            />
          </div>
        </div>
      </div>

      {/* Card 2: Regional Preferences */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
        <h3 className="text-sm font-bold text-[#17324D]">Regional Preferences</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
            >
              <option value="Indonesian Rupiah (IDR)">Indonesian Rupiah (IDR)</option>
              <option value="US Dollar (USD)">US Dollar (USD)</option>
              <option value="Singapore Dollar (SGD)">Singapore Dollar (SGD)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Time Zone
            </label>
            <select
              value={timeZone}
              onChange={(e) => setTimeZone(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
            >
              <option value="Asia/Jakarta (GMT+7)">Asia/Jakarta (GMT+7)</option>
              <option value="Asia/Makassar (GMT+8)">Asia/Makassar (GMT+8)</option>
              <option value="Asia/Jayapura (GMT+9)">Asia/Jayapura (GMT+9)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Date Format
            </label>
            <select
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563A6]/20 focus:border-[#2563A6]"
            >
              <option value="DD MMM YYYY">DD MMM YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            </select>
          </div>
        </div>
      </div>

      {/* Card 3: Notifications */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] space-y-4">
        <h3 className="text-sm font-bold text-[#17324D]">Notifications</h3>

        <div className="space-y-4">
          {/* Notification 1 */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                <PackageX className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block">Low stock alerts</span>
                <span className="text-[11px] text-slate-400 block">Get notified when products are running low on stock.</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setLowStockAlerts(!lowStockAlerts)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${
                lowStockAlerts ? 'bg-[#2E945A]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                  lowStockAlerts ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Notification 2 */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block">Expiring products alerts</span>
                <span className="text-[11px] text-slate-400 block">Get notified when products are close to their expiration date.</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setExpiringProductsAlerts(!expiringProductsAlerts)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${
                expiringProductsAlerts ? 'bg-[#2E945A]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                  expiringProductsAlerts ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Notification 3 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2563A6] flex items-center justify-center shrink-0">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-800 block">New order notifications</span>
                <span className="text-[11px] text-slate-400 block">Get notified when a new order is placed.</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setNewOrderNotifications(!newOrderNotifications)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${
                newOrderNotifications ? 'bg-[#2E945A]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                  newOrderNotifications ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
