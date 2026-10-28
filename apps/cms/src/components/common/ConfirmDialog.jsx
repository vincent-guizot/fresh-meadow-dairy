import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle, CheckCircle, Info, X, PlusCircle } from 'lucide-react';

export default function ConfirmDialog({
  isOpen,
  title = 'Konfirmasi Tindakan',
  message = 'Apakah Anda yakin ingin memproses tindakan ini?',
  confirmText = 'Ya, Konfirmasi',
  cancelText = 'Batal',
  isDestructive = false,
  iconType = 'create', // 'create' | 'danger' | 'warning' | 'info'
  onConfirm,
  onCancel
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCancel && onCancel();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const renderIcon = () => {
    if (isDestructive || iconType === 'danger') {
      return (
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-red-100 text-red-600 shrink-0 shadow-inner">
          <AlertTriangle className="w-6 h-6" />
        </div>
      );
    }
    if (iconType === 'create') {
      return (
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-emerald-100 text-emerald-700 shrink-0 shadow-inner">
          <CheckCircle className="w-6 h-6" />
        </div>
      );
    }
    if (iconType === 'warning') {
      return (
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-amber-100 text-amber-700 shrink-0 shadow-inner">
          <AlertTriangle className="w-6 h-6" />
        </div>
      );
    }
    return (
      <div className="w-11 h-11 rounded-2xl flex items-center justify-center bg-blue-100 text-[#2563A6] shrink-0 shadow-inner">
        <Info className="w-6 h-6" />
      </div>
    );
  };

  const modalContent = (
    <div 
      className="modal-backdrop"
      onClick={onCancel}
    >
      <div 
        className="modal-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3.5">
            {renderIcon()}
            <div>
              <span className="inline-block text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 mb-1">
                {iconType === 'create' ? 'Konfirmasi Pembuatan' : isDestructive ? 'Tindakan Berbahaya' : 'Konfirmasi Tindakan'}
              </span>
              <h3 className="text-base font-bold text-[#17324D] leading-snug">{title}</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="btn-icon"
            aria-label="Tutup dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
          {message}
        </div>

        <div className="mt-6 flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={
              isDestructive
                ? 'btn-danger'
                : iconType === 'create'
                ? 'btn-success'
                : 'btn-primary'
            }
          >
            {iconType === 'create' && <PlusCircle className="w-3.5 h-3.5" />}
            <span>{confirmText}</span>
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
