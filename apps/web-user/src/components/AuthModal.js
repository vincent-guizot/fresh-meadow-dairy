'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Dialog } from '@base-ui-components/react/dialog';
import { X, Lock, Mail, User, ShieldCheck, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { loginCustomer, registerCustomer } from '../services/api';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, authMode, setAuthMode, setAuth } = useAuthStore();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(true);

    try {
      if (authMode === 'login') {
        const identifier = form.email || form.username;
        const result = await loginCustomer(identifier, form.password);
        const userData = result.user || {
          id: result.id || 1,
          username: form.username || form.email.split('@')[0],
          email: form.email,
        };
        setAuth(userData, result.access_token);
        setSuccessMsg('Login berhasil! Selamat datang kembali.');
        setTimeout(() => {
          closeAuthModal();
          setSuccessMsg('');
        }, 800);
      } else {
        // Register flow
        const username = form.username || form.email.split('@')[0];
        const result = await registerCustomer(username, form.email, form.password);
        const userData = {
          id: result.id || Date.now(),
          username: result.username || username,
          email: result.email || form.email,
        };
        setAuth(userData, result.access_token || `token-${Date.now()}`);
        setSuccessMsg('Pendaftaran akun berhasil!');
        setTimeout(() => {
          closeAuthModal();
          setSuccessMsg('');
        }, 800);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Terjadi kesalahan saat memproses akun Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={isAuthModalOpen} onOpenChange={(open) => !open && closeAuthModal()}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-fmd-navy-900/60 backdrop-blur-xs z-50 animate-in fade-in" />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <Dialog.Popup className="relative w-full max-w-2xl bg-white rounded-3xl shadow-modal border border-fmd-cream-300 overflow-hidden my-8">
            {/* Close Button */}
            <Dialog.Close
              onClick={closeAuthModal}
              className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-fmd-cream-200 text-gray-500 hover:text-fmd-navy-700 flex items-center justify-center border border-fmd-cream-300 shadow-xs transition-colors"
            >
              <X className="w-4 h-4" />
            </Dialog.Close>

            <div className="grid grid-cols-1 md:grid-cols-12">
              {/* Left Panel: Branded Pastoral Graphic */}
              <div className="hidden md:flex md:col-span-5 bg-gradient-to-br from-fmd-blue-700 via-fmd-blue-800 to-fmd-navy-900 p-8 flex-col justify-between text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <Image
                    src="/assets/sidebar-pasture.png"
                    alt="Pasture"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="relative z-10 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center p-2">
                    <Image
                      src="/assets/logo.png"
                      alt="Logo"
                      width={36}
                      height={36}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-fmd-cream-100 leading-tight">
                    Fresh Meadow Dairy
                  </h3>
                  <p className="text-xs text-fmd-blue-100/80 leading-relaxed">
                    Susu segar padang rumput langsung ke depan pintu Anda dengan pengiriman dingin 2°C - 4°C.
                  </p>
                </div>

                <div className="relative z-10 pt-6 border-t border-white/15 space-y-2 text-xs text-fmd-cream-200">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-fmd-yellow-400 shrink-0" />
                    <span>Jaminan kesegaran botol pertama</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-fmd-yellow-400 shrink-0" />
                    <span>Pengiriman pagi jam 06:00 - 08:00 AM</span>
                  </div>
                </div>
              </div>

              {/* Right Panel: Form Content */}
              <div className="col-span-1 md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  {/* Switch Tab: Login vs Register */}
                  <div className="flex bg-fmd-cream-200 p-1 rounded-2xl mb-6">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('login');
                        setErrorMsg('');
                      }}
                      className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                        authMode === 'login'
                          ? 'bg-white text-fmd-blue-500 shadow-xs'
                          : 'text-gray-500 hover:text-fmd-navy-700'
                      }`}
                    >
                      Masuk (Login)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('register');
                        setErrorMsg('');
                      }}
                      className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                        authMode === 'register'
                          ? 'bg-white text-fmd-blue-500 shadow-xs'
                          : 'text-gray-500 hover:text-fmd-navy-700'
                      }`}
                    >
                      Daftar Akun
                    </button>
                  </div>

                  <Dialog.Title className="font-serif font-bold text-2xl text-fmd-navy-700">
                    {authMode === 'login' ? 'Selamat Datang Kembali' : 'Buat Akun Pelanggan'}
                  </Dialog.Title>
                  <Dialog.Description className="text-xs text-gray-500 mt-1 mb-5">
                    {authMode === 'login'
                      ? 'Silakan masuk untuk melanjutkan ke checkout dan melacak pesanan susu Anda.'
                      : 'Daftar akun gratis untuk menikmati kemudahan pengiriman susu dingin setiap pagi.'}
                  </Dialog.Description>

                  {/* Feedback Alerts */}
                  {errorMsg && (
                    <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  {successMsg && (
                    <div className="mb-4 p-3 rounded-xl bg-fmd-green-50 border border-fmd-green-200 text-fmd-green-600 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-fmd-green-500" />
                      <span>{successMsg}</span>
                    </div>
                  )}

                  {/* Form Fields */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {authMode === 'register' && (
                      <div>
                        <label className="block text-xs font-semibold text-fmd-navy-700 mb-1">
                          Nama Pengguna (Username) *
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            placeholder="Contoh: Budi Santoso"
                            value={form.username}
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-fmd-cream-50 border border-fmd-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-fmd-blue-500/30 focus:border-fmd-blue-500"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-fmd-navy-700 mb-1">
                        Alamat Email *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          placeholder="nama@email.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-fmd-cream-50 border border-fmd-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-fmd-blue-500/30 focus:border-fmd-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-fmd-navy-700 mb-1">
                        Kata Sandi (Password) *
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="password"
                          required
                          placeholder="Minimal 6 karakter"
                          value={form.password}
                          onChange={(e) => setForm({ ...form, password: e.target.value })}
                          className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-fmd-cream-50 border border-fmd-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-fmd-blue-500/30 focus:border-fmd-blue-500"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full mt-2 py-3.5 rounded-2xl bg-fmd-blue-500 hover:bg-fmd-blue-600 disabled:bg-gray-300 text-white font-bold text-xs sm:text-sm shadow-md shadow-fmd-blue-500/20 flex items-center justify-center gap-2 transition-all"
                    >
                      <span>{loading ? 'Memproses...' : authMode === 'login' ? 'Masuk Sekarang' : 'Daftar Akun'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>

                <div className="mt-6 pt-4 border-t border-fmd-cream-200 text-center text-xs text-gray-400">
                  <span>Segar dari peternakan pegunungan • Standar dingin 2°C - 4°C</span>
                </div>
              </div>
            </div>
          </Dialog.Popup>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
